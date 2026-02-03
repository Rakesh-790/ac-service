package backend.ac_service.dto;

import java.time.LocalDate;

import backend.ac_service.constants.AcCleaningType;
import backend.ac_service.constants.AcType;
import backend.ac_service.entity.Booking;
import lombok.Data;

@Data
public class BookingResponse {
    
    private AcType acType;
    private AcCleaningType cleaningType;
    private LocalDate date;
    private String time;
    private String address;
    private String fullName;
    private String phoneNumber;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponse dto = new BookingResponse();
        dto.acType = booking.getAcType();
        dto.cleaningType = booking.getCleaningType();
        dto.date = booking.getDate();
        dto.time = booking.getTime();
        dto.address = booking.getAddress();
        dto.fullName = booking.getFullName();
        dto.phoneNumber = booking.getPhoneNumber();
        return dto;
    }
}

