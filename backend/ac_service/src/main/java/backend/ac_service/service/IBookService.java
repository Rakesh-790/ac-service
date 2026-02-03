package backend.ac_service.service;

import java.util.List;

import backend.ac_service.dto.BookingRequest;
import backend.ac_service.dto.BookingResponse;

public interface IBookService {
    List<BookingResponse> getMyBookings(String email);

    void createBooking(BookingRequest request, String email);

    List<BookingResponse> getAllBookings();
}
