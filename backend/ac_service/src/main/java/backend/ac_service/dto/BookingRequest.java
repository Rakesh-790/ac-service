package backend.ac_service.dto;

import java.time.LocalDate;

import backend.ac_service.constants.AcCleaningType;
import backend.ac_service.constants.AcType;
import lombok.Data;

@Data
public class BookingRequest {

    private AcType acType;
    private AcCleaningType cleaningType;
    private LocalDate date;
    private String timeSlot;
    private String address;
    private String name;
    private String phoneNumber;
}

