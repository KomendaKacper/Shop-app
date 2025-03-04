package com.example.online_store.repositories;

import com.example.online_store.entity.Clothes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    boolean existsByName(String name);
    List<Clothes> findByCategory(String category);
    List<Clothes> findByNameContaining(String name);
    Page<Clothes> findAll(Pageable pageable);
}
