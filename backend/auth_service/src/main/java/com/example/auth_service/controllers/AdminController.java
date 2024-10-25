package com.example.auth_service.controllers;

import com.example.auth_service.entity.User;
import com.example.auth_service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/update-role")
    public ResponseEntity<String> updateRole(@RequestParam Long userId, @RequestBody String roleName) {
        userService.updateUserRole(userId, roleName);
        return ResponseEntity.ok("Successfully updated role");
    }


}
