package backend.ac_service.service;

import backend.ac_service.constants.BookingStatus;
import backend.ac_service.dto.BookingResponse;

public interface IBookingStatusPublisher {
    void sendBookingUpdate(String bookingId, BookingStatus status, String message);

    void notifyAdmin(BookingResponse booking);
}
