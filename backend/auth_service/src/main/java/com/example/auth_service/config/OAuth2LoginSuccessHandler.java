package com.example.auth_service.config;

import com.example.auth_service.jwt.JwtUtils;
import com.example.auth_service.models.Role;
import com.example.auth_service.models.RolesEnum;
import com.example.auth_service.models.User;
import com.example.auth_service.repositories.RoleRepository;
import com.example.auth_service.security.services.UserDetailsImpl;
import com.example.auth_service.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        String registrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();

        if ("google".equals(registrationId)) {
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String, Object> attributes = principal.getAttributes();

            String email = (String) attributes.getOrDefault("email", "");
            String name = (String) attributes.getOrDefault("name", "");
            String username = email.contains("@") ? email.split("@")[0] : email;

            System.out.println("HELLO OAUTH: " + email + " : " + name + " : " + username);

            User user = userService.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUserName(username);
                newUser.setSignUpMethod(registrationId);

                Role defaultRole = roleRepository.findByRoleName(RolesEnum.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Default role not found"));
                newUser.setRole(defaultRole);

                userService.registerUser(newUser);
                return newUser;
            });

            String roleName = user.getRole().getRoleName().name();

            Authentication securityAuth = new OAuth2AuthenticationToken(
                    new DefaultOAuth2User(
                            List.of(new SimpleGrantedAuthority(roleName)),
                            attributes,
                            "sub"
                    ),
                    List.of(new SimpleGrantedAuthority(roleName)),
                    registrationId
            );
            SecurityContextHolder.getContext().setAuthentication(securityAuth);

            UserDetailsImpl userDetails = new UserDetailsImpl(
                    null,
                    username,
                    email,
                    null,
                    false,
                    securityAuth.getAuthorities()
            );

            String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/home")
                    .queryParam("token", jwtToken)
                    .queryParam("username", username)
                    .queryParam("role", roleName)
                    .build().toUriString();

            this.setDefaultTargetUrl(targetUrl);
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
