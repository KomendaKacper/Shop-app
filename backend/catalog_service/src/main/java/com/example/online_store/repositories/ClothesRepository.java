package com.example.online_store.repositories;

import com.example.online_store.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    boolean existsByName(String name);
    List<Clothes> findByCategory(String category);
    List<Clothes> findByNameIn(List<String> names);
}
