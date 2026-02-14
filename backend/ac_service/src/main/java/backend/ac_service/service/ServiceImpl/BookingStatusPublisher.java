package backend.ac_service.service.ServiceImpl;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import backend.ac_service.constants.BookingStatus;
import backend.ac_service.dto.BookingResponse;
import backend.ac_service.dto.BookingStatusMessageDTO;
import backend.ac_service.service.IBookingStatusPublisher;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingStatusPublisher implements IBookingStatusPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void sendBookingUpdate(String bookingId, BookingStatus status, String message) {
        messagingTemplate.convertAndSend(
                "/topic/booking/" + bookingId,
                new BookingStatusMessageDTO(bookingId, message, status));
    }

    @Override
    public void notifyAdmin(BookingResponse booking) {
        messagingTemplate.convertAndSend(
                "/topic/admin/bookings",
                booking);
    }

}
