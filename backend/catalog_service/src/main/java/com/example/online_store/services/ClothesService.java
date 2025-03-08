package com.example.online_store.services;

import com.example.online_store.entity.Clothes;
import com.example.online_store.repositories.ClothesRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClothesService {

    private static final Logger logger = LoggerFactory.getLogger(ClothesService.class);
    private final ClothesRepository clothesRepository;

    @Autowired
    public ClothesService(ClothesRepository clothesRepository) {
        this.clothesRepository = clothesRepository;
    }

    @CircuitBreaker(name = "clothesService", fallbackMethod = "fallbackGetAllClothes")
    @Retry(name = "clothesService")
    @RateLimiter(name = "clothesService")
    public Page<Clothes> getAllClothes(Pageable pageable) {
        return clothesRepository.findAll(pageable);
    }

    public Page<Clothes> fallbackGetAllClothes(Pageable pageable, Throwable t) {
        logger.error("Circuit breaker activated for getAllClothes. Returning empty page.", t);
        return Page.empty();
    }

    @CircuitBreaker(name = "clothesService", fallbackMethod = "fallbackGetClothesById")
    @RateLimiter(name = "clothesService")
    public Optional<Clothes> getClothesById(Long id) {
        return clothesRepository.findById(id);
    }

    public Optional<Clothes> fallbackGetClothesById(Long id, Throwable t) {
        logger.error("Circuit breaker activated for getClothesById. Returning empty result.", t);
        return Optional.empty();
    }

    @CircuitBreaker(name = "clothesService", fallbackMethod = "fallbackSaveClothes")
    public Clothes saveClothes(Clothes clothes) {
        return clothesRepository.save(clothes);
    }

    public Clothes fallbackSaveClothes(Clothes clothes, Throwable t) {
        logger.error("Circuit breaker activated for saveClothes. Returning null.", t);
        return null;
    }

    @CircuitBreaker(name = "clothesService", fallbackMethod = "fallbackDeleteClothesById")
    @RateLimiter(name = "clothesService")
    public String deleteClothesById(Long id) {
        try {
            clothesRepository.deleteById(id);
            return "Product " + id + " deleted successfully.";
        } catch (EmptyResultDataAccessException e) {
            return "Product " + id + " not found.";
        }
    }

    public String fallbackDeleteClothesById(Long id, Throwable t) {
        logger.error("Circuit breaker activated for deleteClothesById. Returning error message.", t);
        return "Service temporarily unavailable. Please try again later.";
    }

    public List<Clothes> findByName(String name) {
        return clothesRepository.findByNameContaining(name);
    }

    public List<Clothes> findByCategory(String category) {
        return clothesRepository.findByCategory(category);
    }
}
