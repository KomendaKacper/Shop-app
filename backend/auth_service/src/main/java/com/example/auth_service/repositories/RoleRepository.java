package com.example.auth_service.repositories;

import com.example.auth_service.entity.Roles;
import com.example.auth_service.entity.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByName(RolesEnum role);
}
