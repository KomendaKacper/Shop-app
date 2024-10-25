package com.example.auth_service.services;


import com.example.auth_service.dtos.UserDTO;
import com.example.auth_service.entity.Role;
import com.example.auth_service.entity.User;

import java.util.List;

public interface UserService {
    void updateUserRole(Long userId, String roleName);
    List<User> getAllUsers();
    UserDTO getUserById(Long userId);
}
