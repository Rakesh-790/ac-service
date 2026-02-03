package backend.ac_service.dto;

import backend.ac_service.constants.Role;
import backend.ac_service.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record UserResponseDTO(
        String email,
        @Enumerated(EnumType.STRING)
        Role role
) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(
                user.getUserEmail(),
                user.getRole()
        );
    }
}
