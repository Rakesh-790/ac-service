package backend.ac_service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.ac_service.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByUser_UserId(String userId);

    List<Booking> findByUser_UserEmail(String email);
}
