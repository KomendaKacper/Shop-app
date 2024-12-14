package com.example.online_store.services;

import com.example.online_store.entity.Clothes;
import com.example.online_store.repositories.ClothesRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataInitializer {

    @Autowired
    private ClothesRepository clothesRepository;

    @PostConstruct
    public void init() {
        if (!clothesRepository.existsByName("Classic Fedora")) {
            Clothes hat1 = new Clothes("Classic Fedora", "Elegant black fedora hat", "One size", "Black", 59.99, "Hat", "clothesImages/hat2.png");
            clothesRepository.save(hat1);
        }

        if (!clothesRepository.existsByName("Urban Edge Jacket")) {
            Clothes jacket1 = new Clothes("Urban Edge Jacket", "Stylish leather jacket for modern looks", "M", "Black", 129.99, "Jacket", "clothesImages/leather2.png");
            clothesRepository.save(jacket1);
        }

        if (!clothesRepository.existsByName("Vintage Jeans")) {
            Clothes jeans1 = new Clothes("Vintage Jeans", "Comfortable vintage blue jeans", "L", "Blue", 79.99, "Jeans", "clothesImages/jeans.png");
            clothesRepository.save(jeans1);
        }

        if (!clothesRepository.existsByName("Comfy Sweatshirt")) {
            Clothes sweatshirt1 = new Clothes("Comfy Sweatshirt", "Cozy white sweatshirt for all-day comfort", "S", "White", 49.99, "Sweatshirt", "clothesImages/sweatshirt.png");
            clothesRepository.save(sweatshirt1);
        }

        if (!clothesRepository.existsByName("Bold Explorer Jacket")) {
            Clothes jacket2 = new Clothes("Bold Explorer Jacket", "Leather jacket with bold design", "L", "Brown", 139.99, "Jacket", "clothesImages/leather4.png");
            clothesRepository.save(jacket2);
        }

        if (!clothesRepository.existsByName("Weekend Chill T-shirt")) {
            Clothes tshirt1 = new Clothes("Weekend Chill T-shirt", "Light and soft cotton t-shirt", "M", "Gray", 29.99, "T-shirt", "clothesImages/t-shirt2.png");
            clothesRepository.save(tshirt1);
        }

        if (!clothesRepository.existsByName("Denim Rebel Jacket")) {
            Clothes jacket3 = new Clothes("Denim Rebel Jacket", "Casual denim jacket", "S", "Blue", 99.99, "Jacket", "clothesImages/jacket_woman.jpg");
            clothesRepository.save(jacket3);
        }

        if (!clothesRepository.existsByName("Sleek Necklace")) {
            Clothes necklace1 = new Clothes("Sleek Necklace", "Minimalist silver necklace", "One size", "Silver", 39.99, "Accessory", "clothesImages/necklace.png");
            clothesRepository.save(necklace1);
        }

        if (!clothesRepository.existsByName("Explorer's Hat")) {
            Clothes hat2 = new Clothes("Explorer's Hat", "Wide-brimmed beige hat for adventures", "One size", "Beige", 49.99, "Hat", "clothesImages/hat4.png");
            clothesRepository.save(hat2);
        }

        if (!clothesRepository.existsByName("Street Style Jeans")) {
            Clothes jeans2 = new Clothes("Street Style Jeans", "Trendy skinny jeans", "M", "Dark Blue", 84.99, "Jeans", "clothesImages/jeans2.png");
            clothesRepository.save(jeans2);
        }

        if (!clothesRepository.existsByName("Soft Cotton Shirt")) {
            Clothes shirt1 = new Clothes("Soft Cotton Shirt", "Simple white shirt for all occasions", "M", "White", 64.99, "Shirt", "clothesImages/shirt.jpg");
            clothesRepository.save(shirt1);
        }

        if (!clothesRepository.existsByName("Cozy Hoodie")) {
            Clothes sweatshirt2 = new Clothes("Cozy Hoodie", "Warm hoodie perfect for cold days", "L", "Gray", 59.99, "Hoodie", "clothesImages/sweatshirt2.png");
            clothesRepository.save(sweatshirt2);
        }
    }
}
