package com.example.auth_service.repositories;

import com.example.auth_service.entity.Role;
import com.example.auth_service.entity.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RolesEnum roleName);
}
