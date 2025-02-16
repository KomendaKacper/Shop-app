package com.example.api_gateway.proxy;

import com.example.api_gateway.responses.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service")
public interface AuthServiceClient {

    @GetMapping("/api/auth/user")
    UserResponse getUserInfo(@RequestHeader("Authorization") String authorization);
}
