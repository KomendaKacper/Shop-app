package com.example.auth_service.repositories;

import com.example.auth_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String email);
    boolean existsByUserName(String username);
}
