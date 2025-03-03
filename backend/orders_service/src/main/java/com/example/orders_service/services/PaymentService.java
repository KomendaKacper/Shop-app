package com.example.orders_service.services;

import com.example.orders_service.dto.ItemDTO;
import com.example.orders_service.entity.Payment;
import com.example.orders_service.entity.PurchasedItem;
import com.example.orders_service.repositories.PaymentRepository;
import com.example.orders_service.requestmodels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

import java.util.*;

@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;


    @PostConstruct
    public void init() {
        System.out.println("Stripe API Key (from @Value): " + secretKey);
        Stripe.apiKey = secretKey;
        System.out.println("Stripe.apiKey (Stripe object): " + Stripe.apiKey);
    }
    @Value("${catalog.service.url}")
    private String catalogServiceUrl;

    @Value("${Stripe.apiKey}")
    private String secretKey;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
        System.out.println("Stripe.apiKey (Stripe object): " + Stripe.apiKey);
    }


    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(String userEmail, List<ItemDTO> cart) {
        final Payment payment = paymentRepository.findByUserEmail(userEmail);

        if (payment == null) {
            Payment newPayment = new Payment();
            newPayment.setUserEmail(userEmail);
            newPayment.setAmount(0.00);
            paymentRepository.save(newPayment);

            return savePaymentWithItems(newPayment, cart);
        }

        return savePaymentWithItems(payment, cart);
    }

    private ResponseEntity<String> savePaymentWithItems(Payment payment, List<ItemDTO> cart) {
        final double totalAmount = cart.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        payment.setAmount(totalAmount);

        List<PurchasedItem> purchasedItems = cart.stream()
                .map(item -> new PurchasedItem(payment, item.getName(), item.getPrice(), item.getQuantity()))
                .collect(Collectors.toList());


        payment.setPurchasedItems(purchasedItems);
        paymentRepository.save(payment);

        return new ResponseEntity<>("Payment record created/updated successfully", HttpStatus.OK);
    }

}
