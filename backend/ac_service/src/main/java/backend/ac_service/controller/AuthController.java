package backend.ac_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.ac_service.Repository.UserRepository;
import backend.ac_service.dto.AuthRequest;
import backend.ac_service.dto.AuthResponse;
import backend.ac_service.dto.RefreshRequest;
import backend.ac_service.dto.UserResponseDTO;
import backend.ac_service.entity.User;
import backend.ac_service.security.jwt.JwtUtils;
import backend.ac_service.service.IAuthService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtils jwtUtils;
    private final IAuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody AuthRequest request) {
        return new ResponseEntity<>(authService.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
        String refreshToken = request.refreshToken(); 

        if (jwtUtils.validateToken(refreshToken, jwtUtils.getUsername(refreshToken))) {
            User user = userRepository.findByUserEmail(jwtUtils.getUsername(refreshToken))
                    .orElseThrow();
            String newAccessToken = jwtUtils.generateAccessToken(user, user.getRole().toString());
            String newRefreshToken = jwtUtils.generateRefreshToken(user); // optional rotation

            return ResponseEntity.ok(new AuthResponse(newAccessToken, newRefreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
