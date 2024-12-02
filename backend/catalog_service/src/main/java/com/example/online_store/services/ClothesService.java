package com.example.online_store.services;

import com.example.online_store.entity.Clothes;
import com.example.online_store.repositories.ClothesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClothesService {

    private ClothesRepository clothesRepository;

    @Autowired
    public ClothesService(ClothesRepository clothesRepository) {
        this.clothesRepository = clothesRepository;
    }

    public List<Clothes> getAllClothes(){
        return clothesRepository.findAll();
    }

    public Optional<Clothes> getClothesById(Long id){
        return clothesRepository.findById(id);
    }

    public Clothes saveClothes(Clothes clothes){
        return clothesRepository.save(clothes);
    }

    public String deleteClothesById(Long id) {
        try {
            clothesRepository.deleteById(id);
            return "Product " + id + " deleted successfully.";
        } catch (EmptyResultDataAccessException e) {
            return "Product " + id + " not found.";
        }
    }

    public List<Clothes> filterByCategory(String category){
        return clothesRepository.findByCategory(category);
    }

    public byte[] getImage(String filePath) throws IOException {
        Path path = Path.of(filePath);
        if (Files.exists(path)) {
            return Files.readAllBytes(path);
        } else {
            throw new IOException("Image not found at path: " + filePath);
        }
    }

}
