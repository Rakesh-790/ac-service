package backend.ac_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.ac_service.dto.BookingRequest;
import backend.ac_service.dto.BookingResponse;
import backend.ac_service.service.ServiceImpl.BookingService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> myBookings(Authentication auth) {

        List<BookingResponse> bookings =
            bookingService.getMyBookings(auth.getName());

    return ResponseEntity.ok(bookings);

    }

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> allBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PostMapping("/create-booking")
    public ResponseEntity<String> createBooking(
        @RequestBody BookingRequest request,
        Authentication authentication) {

        bookingService.createBooking(request, authentication.getName());
        return new ResponseEntity<>("Booking created successfully", HttpStatus.CREATED);
    }
}
