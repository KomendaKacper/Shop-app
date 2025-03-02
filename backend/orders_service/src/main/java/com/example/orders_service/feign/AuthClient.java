package com.example.orders_service.feign;

import com.example.orders_service.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "auth-service", url = "${auth.service.url}")
public interface AuthClient {
    @GetMapping("/findByUsername/{username}")
    UserDTO findByUsername(@PathVariable String username);
}

