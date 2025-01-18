package com.example.auth_service.security;

import com.example.auth_service.models.Role;
import com.example.auth_service.models.RolesEnum;
import com.example.auth_service.models.User;
import com.example.auth_service.repositories.RoleRepository;
import com.example.auth_service.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInit {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInit(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            System.out.println("CommandLineRunner is running...");
            Role userRole = initRole(RolesEnum.ROLE_USER);
            Role adminRole = initRole(RolesEnum.ROLE_ADMIN);

            List<UserData> users = Arrays.asList(
                    new UserData("Alice", "alice@example.com", "password1", userRole, true),
                    new UserData("Bob", "bob@example.com", "password2", userRole, true),
                    new UserData("Charlie", "charlie@example.com", "password3", userRole, true),
                    new UserData("Diana", "diana@example.com", "password4", userRole, true),
                    new UserData("Eve", "eve@example.com", "password5", userRole, true),
                    new UserData("Frank", "frank@example.com", "password6", userRole, true),
                    new UserData("Grace", "grace@example.com", "password7", userRole, true),
                    new UserData("Hank", "hank@example.com", "password8", userRole, true),
                    new UserData("Ivy", "ivy@example.com", "password9", adminRole, true),
                    new UserData("Jack", "jack@example.com", "password10", adminRole, true)
            );

            users.forEach(user -> initUser(
                    user.username,
                    user.email,
                    user.password,
                    user.role,
                    user.accountNonLocked
            ));
        };
    }

    private Role initRole(RolesEnum roleName) {
        return roleRepository.findByRoleName(roleName)
                .orElseGet(() -> roleRepository.save(new Role(roleName)));
    }

    private void initUser(String username, String email, String password, Role role, boolean accountNonLocked) {
        if (!userRepository.existsByUserName(username)) {
            User user = new User(username, email, passwordEncoder.encode(password));
            user.setAccountNonLocked(accountNonLocked);
            user.setAccountNonExpired(true);
            user.setCredentialsNonExpired(true);
            user.setEnabled(true);
            user.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
            user.setAccountExpiryDate(LocalDate.now().plusYears(1));
            user.setTwoFactorEnabled(false);
            user.setSignUpMethod("email");
            user.setRole(role);
            userRepository.save(user);
        }
    }

    private static class UserData {
        String username;
        String email;
        String password;
        Role role;
        boolean accountNonLocked;

        public UserData(String username, String email, String password, Role role, boolean accountNonLocked) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.role = role;
            this.accountNonLocked = accountNonLocked;
        }
    }
}
