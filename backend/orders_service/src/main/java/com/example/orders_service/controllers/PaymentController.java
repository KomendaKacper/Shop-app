package com.example.orders_service.controllers;

import com.example.orders_service.dto.ItemDTO;
import com.example.orders_service.dto.UserDTO;
import com.example.orders_service.feign.AuthClient;
import com.example.orders_service.jwt.ExtractJWT;
import com.example.orders_service.requestmodels.PaymentInfoRequest;
import com.example.orders_service.services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payment/secure")
public class PaymentController {

    private final AuthClient authClient;
    private final PaymentService paymentService;

    public PaymentController(AuthClient authClient, PaymentService paymentService) {
        this.authClient = authClient;
        this.paymentService = paymentService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody List<ItemDTO> cart) throws Exception {

        String username = ExtractJWT.payloadJWTExtraction(token, "{\"sub\"");
        UserDTO user = authClient.findByUsername(username);
        if (user == null) {
            throw new Exception("User not found");
        }
        System.out.println(cart);
        return paymentService.stripePayment(user.getEmail(), cart);
    }

}
