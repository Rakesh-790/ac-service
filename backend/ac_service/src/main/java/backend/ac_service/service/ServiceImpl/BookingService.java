package backend.ac_service.service.ServiceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

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
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream()
                .map(BookingResponse::fromEntity)
                .toList();
    }

    public void updateBookingStatus(String bookingId, BookingStatus newStatus) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(newStatus);
        bookingRepository.save(booking);

        bookingStatusPublisher.sendBookingUpdate(
                booking.getBookingId(),
                booking.getStatus(),
                "Booking status updated to " + newStatus);
    }

}
