package com.example.auth_service.repositories;

import com.example.auth_service.models.Role;
import com.example.auth_service.models.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RolesEnum roleName);
}
