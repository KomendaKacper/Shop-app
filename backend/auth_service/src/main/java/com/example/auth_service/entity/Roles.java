package com.example.auth_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Enumerated
    @Column(length = 20, name="role_name")
    private RolesEnum roleName;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade={CascadeType.MERGE})
    @JsonBackReference
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    public Roles(RolesEnum roleName) {
        this.roleName = roleName;
    }
}
