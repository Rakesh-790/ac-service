package backend.ac_service.dto;

import java.time.LocalDate;

import backend.ac_service.constants.AcCleaningType;
import backend.ac_service.constants.AcType;
import backend.ac_service.constants.BookingStatus;
import backend.ac_service.entity.Booking;
import lombok.Data;

@Data
public class BookingResponse {

    private String bookingId;
    private AcType acType;
    private AcCleaningType cleaningType;
    private LocalDate date;
    private String time;
    private String address;
    private String fullName;
    private String phoneNumber;
    private BookingStatus status;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponse dto = new BookingResponse();
        dto.bookingId = booking.getBookingId();
        dto.acType = booking.getAcType();
        dto.cleaningType = booking.getCleaningType();
        dto.date = booking.getDate();
        dto.time = booking.getTime();
        dto.address = booking.getAddress();
        dto.fullName = booking.getFullName();
        dto.phoneNumber = booking.getPhoneNumber();
        dto.status = booking.getStatus();
        return dto;
    }
}
