package com.example.orders_service.services;

import com.example.orders_service.dto.ClothesDTO;
import com.example.orders_service.entity.Payment;
import com.example.orders_service.repositories.PaymentRepository;
import com.example.orders_service.requestmodels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;

    private final RestTemplate restTemplate;

    @Value("${catalog.service.url}")
    private String catalogServiceUrl;

    @Value("${stripe.key.secret}") String secretKey;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository,
                          RestTemplate restTemplate) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
        this.restTemplate = restTemplate;
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

    public ResponseEntity<String> stripePayment(String userEmail) throws Exception {
        Payment payment = paymentRepository.findByUserEmail(userEmail);

        if (payment == null) {
            throw new Exception("Payment information is missing");
        }
        payment.setAmount(00.0);
        paymentRepository.save(payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<ClothesDTO> fetchClothesByNames(List<String> names) {
        String url = catalogServiceUrl + "/api/catalog/filter-by-names";
        ResponseEntity<ClothesDTO[]> response = restTemplate.postForEntity(url, names, ClothesDTO[].class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return Arrays.asList(response.getBody());
        } else {
            throw new RuntimeException("Failed to fetch clothes from catalog_service");
        }
    }

}
