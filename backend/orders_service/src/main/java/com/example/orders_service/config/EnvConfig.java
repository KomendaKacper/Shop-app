// package com.example.orders_service.config;

// import io.github.cdimascio.dotenv.Dotenv;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class EnvConfig {
//     static {
//         Dotenv dotenv = Dotenv.configure().directory("../backend").load();
//         String stripeKey = dotenv.get("STRIPE_KEY_SECRET");

//         if (stripeKey != null) {
//             System.setProperty("STRIPE_KEY_SECRET", stripeKey);
//         } else {
//             System.err.println("STRIPE_KEY_SECRET is not set in .env file!");
//         }

//         System.out.println("STRIPE_KEY_SECRET: " + System.getProperty("STRIPE_KEY_SECRET"));
//     }
// }
