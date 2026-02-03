package backend.ac_service.service;

import backend.ac_service.dto.AuthRequest;
import backend.ac_service.dto.AuthResponse;
import backend.ac_service.dto.UserResponseDTO;

public interface IAuthService {
    UserResponseDTO register(AuthRequest request);

    AuthResponse login(AuthRequest request);
}
