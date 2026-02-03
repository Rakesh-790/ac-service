package backend.ac_service.dto;

public record AuthRequest(
        String userEmail,
        String userPassword) {
}