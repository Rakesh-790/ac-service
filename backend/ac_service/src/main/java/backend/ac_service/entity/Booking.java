package backend.ac_service.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import backend.ac_service.constants.AcCleaningType;
import backend.ac_service.constants.AcType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String bookingId;

    @Enumerated(EnumType.STRING)
    private AcType acType;

    @Enumerated(EnumType.STRING)
    private AcCleaningType cleaningType;

    private LocalDate date;
    private String time;

    private String address;

    private String fullName;

    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

}
