package com.example.auth_service.services.impl;

import com.example.auth_service.dtos.UserDTO;
import com.example.auth_service.models.PasswordResetToken;
import com.example.auth_service.models.Role;
import com.example.auth_service.models.RolesEnum;
import com.example.auth_service.models.User;
import com.example.auth_service.repositories.PasswordResetTokenRepository;
import com.example.auth_service.repositories.RoleRepository;
import com.example.auth_service.repositories.UserRepository;
import com.example.auth_service.services.EmailService;
import com.example.auth_service.services.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Value("${frontend.url}")
    String frontendUrl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackGetAllUsers")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackGetAllUsers")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> fallbackGetAllUsers(Throwable t) {
        logger.error("Fallback for getAllUsers, error: {}", t.getMessage());
        return List.of();
    }

    @Override
    @Transactional
    @RateLimiter(name = "userService", fallbackMethod = "fallbackUpdateUserRole")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackUpdateUserRole")
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("Updating role for user: " + user.getUsername());

        RolesEnum rolesEnum = RolesEnum.valueOf(roleName);
        Role role = roleRepository.findByRoleName(rolesEnum)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        userRepository.save(user);
    }

    public void fallbackUpdateUserRole(Long userId, String roleName, Throwable t) {
        logger.error("Fallback for updateUserRole, error: {}", t.getMessage());
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackGetUserById")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackGetUserById")
    public UserDTO getUserById(Long userId) {
        User user = userRepository
                .findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        return  new UserDTO(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.isAccountNonLocked(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isEnabled(),
                user.getCredentialsExpiryDate(),
                user.getAccountExpiryDate(),
                user.getTwoFactorSecret(),
                user.isTwoFactorEnabled(),
                user.getSignUpMethod(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate()
        );
    }

    public UserDTO fallbackGetUserById(Long userId, Throwable t) {
        logger.error("Fallback for getUserById, error: {}", t.getMessage());
        return new UserDTO();
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackFindByUsername")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackFindByUsername")
    @Retry(name = "userService")
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User fallbackFindByUsername(String username, Throwable t) {
        logger.error("Fallback for findByUsername, error: {}", t.getMessage());
        return new User();
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackGeneratePasswordResetToken")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackGeneratePasswordResetToken")
    public void generatePasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plus(24, ChronoUnit.HOURS);
        PasswordResetToken resetToken = new PasswordResetToken(token, expiryDate, user);
        passwordResetTokenRepository.save(resetToken);

        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(user.getEmail(), resetUrl);
    }

    public void fallbackGeneratePasswordResetToken(String email, Throwable t) {
        logger.error("Fallback for generatePasswordResetToken, error: {}", t.getMessage());
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackResetPassword")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackResetPassword")
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));
        if (resetToken.isUsed())
            throw new RuntimeException("Reset token has already been used");
        if (resetToken.getExpiryDate().isBefore(Instant.now()))
            throw new RuntimeException("Reset token has expired");

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }

    public void fallbackResetPassword(String token, String newPassword, Throwable t) {
        logger.error("Fallback for resetPassword, error: {}", t.getMessage());
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackFindByEmail")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackFindByEmail")
    public Optional<User> findByEmail(String email) {
        try {
            return userRepository.findByEmail(email);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<User> fallbackFindByEmail(String email, Throwable t) {
        logger.error("Fallback for findByEmail, error: {}", t.getMessage());
        return Optional.empty();
    }

    @Override
    @RateLimiter(name = "userService", fallbackMethod = "fallbackRegisterUser")
    @CircuitBreaker(name = "userService", fallbackMethod = "fallbackRegisterUser")
    public User registerUser(User user) {
        if (user.getPassword() != null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User fallbackRegisterUser(User user, Throwable t) {
        logger.error("Fallback for registerUser, error: {}", t.getMessage());
        return new User();
    }

    public String deleteUserById(Long userId) {
        try {
            passwordResetTokenRepository.deleteByUser_UserId(userId);
            userRepository.deleteById(userId);
            return "User with id: " + userId + " deleted successfully";
        } catch (EmptyResultDataAccessException e){
            return "User with id: " + userId + "not found";
        }
    }
}
