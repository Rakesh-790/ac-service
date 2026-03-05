package backend.ac_service.service.ServiceImpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import backend.ac_service.Repository.BookingRepository;
import backend.ac_service.Repository.UserRepository;
import backend.ac_service.constants.BookingStatus;
import backend.ac_service.dto.BookingRequest;
import backend.ac_service.dto.BookingResponse;
import backend.ac_service.entity.Booking;
import backend.ac_service.entity.User;
import backend.ac_service.service.IBookService;
import backend.ac_service.service.IBookingStatusPublisher;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final IBookingStatusPublisher bookingStatusPublisher;

    @Override
    public List<BookingResponse> getMyBookings(String email) {

        List<Booking> bookings = bookingRepository.findByUser_UserEmail(email);

        return bookings.stream()
                .map(BookingResponse::fromEntity)
                .toList();

    }

    @Override
    public void createBooking(BookingRequest request, String email) {

        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setAcType(request.getAcType());
        booking.setCleaningType(request.getCleaningType());
        booking.setDate(request.getDate());
        booking.setTime(request.getTimeSlot());
        booking.setAddress(request.getAddress());
        booking.setFullName(request.getName());
        booking.setPhoneNumber(request.getPhoneNumber());
        booking.setStatus(BookingStatus.BOOKED);

        booking.setUser(user);

        bookingRepository.save(booking);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findByStatusNot(BookingStatus.COMPLETED);

        return bookings.stream()
                .map(BookingResponse::fromEntity)
                .toList();
    }

    public void updateStatus(String bookingId, BookingStatus status) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);

        bookingRepository.save(booking);

        bookingStatusPublisher.sendBookingUpdate(
                bookingId,
                status,
                "Your booking status changed to " + status);
    }

    @Transactional
    @Override
    public void cancelBooking(String bookingId, String email) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getUserEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to Cancel the booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        
        Booking savedBooking = bookingRepository.save(booking);

        BookingResponse dto = BookingResponse.fromEntity(savedBooking);

        // 🔴 Send update to the specific user booking page
        bookingStatusPublisher.sendBookingUpdate(
                savedBooking.getBookingId(),
                BookingStatus.CANCELLED,
                "Booking cancelled by user");

        // 🔴 Notify admin dashboard
        bookingStatusPublisher.notifyAdmin(dto);
    }
}
