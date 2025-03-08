package com.example.auth_service.services;


import com.example.auth_service.dtos.UserDTO;
import com.example.auth_service.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void updateUserRole(Long userId, String roleName);
    List<User> getAllUsers();
    UserDTO getUserById(Long userId);
    User findByUsername(String username);
    Optional<User> findByEmail(String email);
    void resetPassword(String token, String newPassword);
    void generatePasswordResetToken(String username);
    User registerUser(User user);
    public String deleteUserById(Long userId);
}
