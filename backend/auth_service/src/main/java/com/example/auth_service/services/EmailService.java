package com.example.auth_service.services;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @RateLimiter(name = "emailService", fallbackMethod = "fallbackSendPasswordResetEmail")
    @CircuitBreaker(name = "emailService", fallbackMethod = "fallbackSendPasswordResetEmail")
    public void sendPasswordResetEmail(String to, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetUrl);
        mailSender.send(message);
    }

    public void fallbackSendPasswordResetEmail(String to, String resetUrl, Throwable t) {
        System.err.println("Error sending email: " + t.getMessage());
    }
}
