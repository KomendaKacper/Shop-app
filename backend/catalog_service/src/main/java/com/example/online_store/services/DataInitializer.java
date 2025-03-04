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
        if (!clothesRepository.existsByName("Streetwear Sweatshirt")) {
            Clothes sweatshirt3 = new Clothes("Streetwear Sweatshirt", "Trendy oversized sweatshirt", "S", "White", 69.99, "Sweatshirt", "clothesImages/sweatshirt3.png");
            clothesRepository.save(sweatshirt3);
        }

        if (!clothesRepository.existsByName("Weekend Chill T-shirt")) {
            Clothes tshirt1 = new Clothes("Weekend Chill T-shirt", "Light and soft cotton t-shirt", "M", "White", 29.99, "T-shirt", "clothesImages/t-shirt.jpg");
            clothesRepository.save(tshirt1);
        }

        if (!clothesRepository.existsByName("Explorer's Hat")) {
            Clothes hat3 = new Clothes("Explorer's Hat", "Beige hat for adventures", "One size", "Beige", 49.99, "Hat", "clothesImages/hat.jpg");
            clothesRepository.save(hat3);
        }

        if (!clothesRepository.existsByName("Soft Cotton Shirt")) {
            Clothes shirt1 = new Clothes("Soft Cotton Shirt", "Simple white shirt for all occasions", "M", "Beige", 64.99, "Shirt", "clothesImages/shirt.jpg");
            clothesRepository.save(shirt1);
        }
        if (!clothesRepository.existsByName("Brown Leather Jacket")) {
            Clothes leather2 = new Clothes("Brown Leather Jacket", "Casual leather jacket", "M", "Black", 139.99, "Jacket", "clothesImages/leather2.png");
            clothesRepository.save(leather2);
        }
        if (!clothesRepository.existsByName("Denim Rebel Jacket")) {
            Clothes jacket2 = new Clothes("Denim Rebel Jacket", "Casual denim jacket", "S", "Beige", 99.99, "Jacket", "clothesImages/jacket_woman.jpg");
            clothesRepository.save(jacket2);
        }

        if (!clothesRepository.existsByName("Casual Undershirt")) {
            Clothes undershirt = new Clothes("Casual Undershirt", "Soft and breathable undershirt", "L", "White", 24.99, "Undershirt", "clothesImages/undershirt.jpg");
            clothesRepository.save(undershirt);
        }

        if (!clothesRepository.existsByName("Classic Fedora")) {
            Clothes hat1 = new Clothes("Classic Fedora", "Elegant black fedora hat", "One size", "Black", 59.99, "Hat", "clothesImages/hat4.png");
            clothesRepository.save(hat1);
        }

        if (!clothesRepository.existsByName("Bold Explorer Jacket")) {
            Clothes leather4 = new Clothes("Bold Explorer Jacket", "Leather jacket with bold design", "L", "Black", 139.99, "Jacket", "clothesImages/leather1.png");
            clothesRepository.save(leather4);
        }

        if (!clothesRepository.existsByName("Classic Trousers")) {
            Clothes trousers = new Clothes("Classic Trousers", "Elegant and comfortable trousers", "M", "Beige", 89.99, "Trousers", "clothesImages/trousers.jpg");
            clothesRepository.save(trousers);
        }

        if (!clothesRepository.existsByName("Street Style Jeans")) {
            Clothes jeans2 = new Clothes("Street Style Jeans", "Trendy skinny jeans", "M", "Light Blue", 84.99, "Jeans", "clothesImages/jeans2.png");
            clothesRepository.save(jeans2);
        }

        if (!clothesRepository.existsByName("Sleek Necklace")) {
            Clothes necklace = new Clothes("Sleek Necklace", "Minimalist silver necklace", "One size", "Silver", 39.99, "Accessory", "clothesImages/necklace.png");
            clothesRepository.save(necklace);
        }

        if (!clothesRepository.existsByName("Stylish Leather Jacket")) {
            Clothes leather3 = new Clothes("Stylish Leather Jacket", "Elegant leather wear", "M", "Black", 159.99, "Jacket", "clothesImages/leather3.png");
            clothesRepository.save(leather3);
        }

        if (!clothesRepository.existsByName("Vintage Jeans")) {
            Clothes jeans1 = new Clothes("Vintage Jeans", "Comfortable vintage blue jeans", "L", "Light Blue", 79.99, "Jeans", "clothesImages/jeans.png");
            clothesRepository.save(jeans1);
        }

        if (!clothesRepository.existsByName("Casual Shirt")) {
            Clothes shirt2 = new Clothes("Casual Shirt", "Light and breathable casual shirt", "S", "White", 59.99, "Shirt", "clothesImages/shirt2.jpg");
            clothesRepository.save(shirt2);
        }

        if (!clothesRepository.existsByName("Stylish Hat")) {
            Clothes hat2 = new Clothes("Stylish Hat", "Trendy streetwear hat", "One size", "Beage - Black", 39.99, "Hat", "clothesImages/hat2.png");
            clothesRepository.save(hat2);
        }

        if (!clothesRepository.existsByName("Urban Edge Jacket")) {
            Clothes jacket1 = new Clothes("Urban Edge Jacket", "Stylish leather jacket for modern looks", "M", "Beige", 129.99, "Jacket", "clothesImages/jacket.jpg");
            clothesRepository.save(jacket1);
        }

        if (!clothesRepository.existsByName("Brown Leather Jacket")) {
            Clothes leather2 = new Clothes("Brown Leather Jacket", "Casual leather jacket", "M", "Black", 139.99, "Jacket", "clothesImages/leather2.png");
            clothesRepository.save(leather2);
        }

        if (!clothesRepository.existsByName("Cozy Sweatshirt")) {
            Clothes sweatshirt1 = new Clothes("Cozy Sweatshirt", "Warm hoodie perfect for cold days", "S", "White", 59.99, "Sweatshirt", "clothesImages/sweatshirt.png");
            clothesRepository.save(sweatshirt1);
        }

        if (!clothesRepository.existsByName("Classic Sweatshirt")) {
            Clothes sweatshirt2 = new Clothes("Classic Sweatshirt", "Basic and comfortable sweatshirt", "M", "Beige", 54.99, "Sweatshirt", "clothesImages/sweatshirt2.png");
            clothesRepository.save(sweatshirt2);
        }


        if (!clothesRepository.existsByName("Basic T-shirt")) {
            Clothes tshirt2 = new Clothes("Basic T-shirt", "Everyday cotton t-shirt", "M", "White", 19.99, "T-shirt", "clothesImages/t-shirt2.png");
            clothesRepository.save(tshirt2);
        }
    }
}
