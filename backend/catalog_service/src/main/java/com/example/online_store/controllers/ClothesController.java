package com.example.online_store.controllers;

import com.example.online_store.entity.Clothes;
import com.example.online_store.repositories.ClothesRepository;
import com.example.online_store.services.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:5173/")
@RequestMapping("/api/catalog")
@RestController
public class ClothesController {

    private ClothesService clothesService;

    @Autowired
    public ClothesController(ClothesService clothesService) {
        this.clothesService = clothesService;
    }

    @PostMapping("/add")
    public Clothes addClothes(@RequestBody Clothes clothes){
        return clothesService.saveClothes(clothes);
    }

    @GetMapping("/products")
    public List<Clothes> getAllClothes(){
        return clothesService.getAllClothes();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Clothes> getClothesById(@PathVariable Long id) {
        Optional<Clothes> clothes = clothesService.getClothesById(id);
        return clothes.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/products/{id}")
    public String deleteClothesById(@PathVariable Long id){
        return clothesService.deleteClothesById(id);

    }
}
