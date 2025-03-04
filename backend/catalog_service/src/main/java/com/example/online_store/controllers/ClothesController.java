package com.example.online_store.controllers;

import com.example.online_store.entity.Clothes;

import com.example.online_store.services.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Page<Clothes>> getAllClothes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Clothes> clothesPage = clothesService.getAllClothes(pageRequest);
        return ResponseEntity.ok(clothesPage);
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

    @GetMapping("/clothesImages/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws Exception{
        try {
            Path imagePath = Paths.get(getClass().getClassLoader().getResource("static/clothesImages/" + imageName).toURI());
            System.out.println("Attempting to read file from: " + imagePath.toAbsolutePath());
            byte[] imageBytes = Files.readAllBytes(imagePath);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath));

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/filter-by-names/{name}")
    public ResponseEntity<List<Clothes>> filterByNames(@PathVariable String name) {
        List<Clothes> clothes = clothesService.findByName(name);
        return new ResponseEntity<>(clothes, HttpStatus.OK);
    }

    @GetMapping("/filter-by-category/{category}")
    public ResponseEntity<List<Clothes>> filterByCategories(@PathVariable String category) {
        List<Clothes> clothes = clothesService.findByCategory(category);
        return new ResponseEntity<>(clothes, HttpStatus.OK);
    }

}
