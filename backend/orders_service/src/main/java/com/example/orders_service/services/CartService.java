package com.example.orders_service.services;

import com.example.orders_service.models.Cart;
import com.example.orders_service.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CartService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CartRepository cartRepository;

    @Value("${user.service.url}")  // Konfiguracja URL do mikroserwisu użytkowników
    private String userServiceUrl;

    public User getUserFromCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        Long userId = cart.getUserId();

        // Wywołanie API mikroserwisu użytkowników
        String url = userServiceUrl + "/users/" + userId;
        User user = restTemplate.getForObject(url, User.class);

        return user;
    }
}
