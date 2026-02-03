package backend.ac_service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import backend.ac_service.Repository.UserRepository;
import backend.ac_service.constants.Role;
import backend.ac_service.entity.User;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class AcServiceApplication {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;

	public static void main(String[] args) {
		SpringApplication.run(AcServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner() {
		return args -> {

			// default admin creation
			String defaultAdminEmail = "admin@gmail.com";
			String defaultAdminPassword = "admin123";
			var existingAdmin = userRepository.findByUserEmail(defaultAdminEmail);

			if (!existingAdmin.isPresent()) {
				var adminUser = User.builder()
						.userEmail(defaultAdminEmail)
						.userPassword(encoder.encode(defaultAdminPassword))
						.role(Role.ROLE_ADMIN)
						.build();

				userRepository.save(adminUser);
				System.out.println("Default admin created: " + defaultAdminEmail + " / " + defaultAdminPassword);
			} else {
				System.out.println("Default admin already exists: " + defaultAdminEmail + " / " + defaultAdminPassword);
			}
  
		};
	}

}
