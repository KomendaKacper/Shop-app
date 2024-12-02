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
        if (!clothesRepository.existsByName("T-shirt")) {
            Clothes clothes1 = new Clothes("T-shirt", "Stylish t-shirt", "M", "Black", 49.99, "T-shirt", "src/main/resources/static/clothesImages/jacket.jpg");
            clothesRepository.save(clothes1);
        }

        if (!clothesRepository.existsByName("Trousers")) {
            Clothes clothes2 = new Clothes("Trousers", "Comfortable trousers", "L", "Blue", 89.99, "Trousers", "src/main/resources/static/clothesImages/trousers.jpg");
            clothesRepository.save(clothes2);
        }

        if (!clothesRepository.existsByName("Hat")) {
            Clothes clothes3 = new Clothes("Hat", "Nice hat", "One size", "Beage", 49.99, "Hat", "src/main/resources/static/clothesImages/hat.jpg");
            clothesRepository.save(clothes3);
        }

        if (!clothesRepository.existsByName("Shirt")) {
            Clothes clothes4 = new Clothes("Shirt", "Basic Shirt", "S", "White", 69.99, "Shirt", "src/main/resources/static/clothesImages/shirt.jpg");
            clothesRepository.save(clothes4);
        }

        if (!clothesRepository.existsByName("Another Shirt")) {
            Clothes clothes5 = new Clothes("Another Shirt", "Not really a basic shirt", "M", "White", 69.99, "Shirt", "src/main/resources/static/clothesImages/shirt2.jpg");
            clothesRepository.save(clothes5);
        }



    }
}
