package backend.ac_service.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.ac_service.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserEmail(String userEmail);
}
