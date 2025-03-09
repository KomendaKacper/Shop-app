package com.example.orders_service.services;

import com.example.orders_service.dto.ItemDTO;
import com.example.orders_service.entity.Payment;
import com.example.orders_service.entity.PurchasedItem;
import com.example.orders_service.repositories.PaymentRepository;
import com.example.orders_service.requestmodels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Value("${Stripe.apiKey}")
    private String secretKey;

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostConstruct
    public void init() {
        System.out.println("Stripe API Key (from @Value): " + secretKey);
        Stripe.apiKey = secretKey;
        System.out.println("Stripe.apiKey (Stripe object): " + Stripe.apiKey);
    }

    @CircuitBreaker(name = "paymentService", fallbackMethod = "fallbackCreatePaymentIntent")
    @Retry(name = "paymentService")
    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public PaymentIntent fallbackCreatePaymentIntent(PaymentInfoRequest paymentInfoRequest, Throwable t) {
        log.error("Circuit breaker activated for createPaymentIntent. Returning null.", t);
        return null;
    }

    @CircuitBreaker(name = "paymentService", fallbackMethod = "fallbackStripePayment")
    @RateLimiter(name = "paymentService")
    public ResponseEntity<String> stripePayment(String userEmail, List<ItemDTO> cart) {
        log.info("Rozpoczęcie nowej płatności dla użytkownika: {}", userEmail);

        final double totalAmount = cart.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        log.info("Całkowita kwota nowej płatności: {}", totalAmount);

        Payment newPayment = new Payment();
        newPayment.setUserEmail(userEmail);
        newPayment.setAmount(totalAmount);

        List<PurchasedItem> purchasedItems = new ArrayList<>();
        for (ItemDTO item : cart) {
            purchasedItems.add(new PurchasedItem(newPayment, item.getName(), item.getPrice(), item.getQuantity()));
        }
        newPayment.setPurchasedItems(purchasedItems);

        paymentRepository.save(newPayment);
        log.info("New payment saved in db: {}", userEmail);

        return new ResponseEntity<>("Payment record created successfully", HttpStatus.OK);
    }

    public ResponseEntity<String> fallbackStripePayment(String userEmail, List<ItemDTO> cart, Throwable t) {
        log.error("Circuit breaker activated for stripePayment. Returning error response.", t);
        return new ResponseEntity<>("Service temporarily unavailable. Please try again later.", HttpStatus.SERVICE_UNAVAILABLE);
    }
}
