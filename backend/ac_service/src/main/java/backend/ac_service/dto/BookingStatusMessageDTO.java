package backend.ac_service.dto;

import backend.ac_service.constants.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatusMessageDTO {
    private String bookingId;
    private String message;
    private BookingStatus status;   
}
