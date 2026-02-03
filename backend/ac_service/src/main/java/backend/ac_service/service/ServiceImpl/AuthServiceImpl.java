package backend.ac_service.service.ServiceImpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import backend.ac_service.security.jwt.JwtUtils;

import backend.ac_service.Repository.UserRepository;
import backend.ac_service.constants.Role;
import backend.ac_service.dto.AuthRequest;
import backend.ac_service.dto.AuthResponse;
import backend.ac_service.dto.UserResponseDTO;
import backend.ac_service.entity.User;
import backend.ac_service.service.IAuthService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    
   private final UserRepository userRepository; 
    private final PasswordEncoder encoder; 
    private final AuthenticationManager manager; 
    private final JwtUtils jwtUtils; 

    // REGISTER USER
    @Override
    public UserResponseDTO register(AuthRequest request) {
        if (userRepository.findByUserEmail(request.userEmail()).isPresent()) {
            throw new UsernameNotFoundException("Email already registered with us");
        }

        User user = User.builder()
                .userEmail(request.userEmail())
                .userPassword(encoder.encode(request.userPassword()))
                .role(Role.ROLE_USER)
                .build();

        return UserResponseDTO.fromEntity(userRepository.save(user));
    }

    // LOGIN USER (UPDATED for Access + Refresh Tokens)
    @Override
    public AuthResponse login(AuthRequest request) {
        // Authenticate user credentials
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(request.userEmail(), request.userPassword()));

        User user = userRepository.findByUserEmail(request.userEmail())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + request.userEmail()));

        // Generate JWT tokens
        String accessToken = jwtUtils.generateAccessToken(user, user.getRole().toString());
        String refreshToken = jwtUtils.generateRefreshToken(user);

        // Return tokens in response
        return new AuthResponse(accessToken, refreshToken);
    }
}


