package com.example.auth_service.repositories;

import com.example.auth_service.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String email);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
