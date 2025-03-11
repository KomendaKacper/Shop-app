package com.example.orders_service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public SecurityConfig() {
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/**")  // Wyjątek dla /api/csrf-token
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // Użycie CookieCsrfTokenRepository
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/payment/**").permitAll()  // Zezwalamy na dostęp do endpointu płatności
                        .anyRequest().authenticated()  // Reszta wymaga uwierzytelnienia
                )
                .formLogin(withDefaults())  // Umożliwiamy formularz logowania
                .httpBasic(withDefaults());  // Umożliwiamy podstawowe uwierzytelnianie HTTP

        return http.build();
    }


    @Bean
    public HttpFirewall allowDoubleSlashesFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedDoubleSlash(true);
        return firewall;
    }
}
