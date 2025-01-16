package com.example.online_store.controllers;

import com.example.online_store.entity.Clothes;

import com.example.online_store.services.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
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

    @PostMapping("/filter-by-names")
    public ResponseEntity<List<Clothes>> filterByNames(@RequestBody List<String> names) {
        List<Clothes> clothes = clothesService.findByNames(names);
        return new ResponseEntity<>(clothes, HttpStatus.OK);
    }

}
