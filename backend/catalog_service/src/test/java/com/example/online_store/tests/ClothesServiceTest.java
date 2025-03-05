package com.example.online_store.tests;

import com.example.online_store.entity.Clothes;
import com.example.online_store.repositories.ClothesRepository;
import com.example.online_store.services.ClothesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

public class ClothesServiceTest {

    @Mock
    private ClothesRepository clothesRepository;

    @InjectMocks
    private ClothesService clothesService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveClothes() {
        Clothes clothes = new Clothes("Jacket", "Leather jacket", "L", "Black", 99.99, "Jackets");

        when(clothesRepository.save(any(Clothes.class))).thenReturn(clothes);

        Clothes savedClothes = clothesService.saveClothes(clothes);

        assertNotNull(savedClothes);
        assertEquals("Jacket", savedClothes.getName());
        assertEquals(99.99, savedClothes.getPrice());
    }

    @Test
    public void testGetClothesById() {
        Clothes clothes = new Clothes("Jacket", "Leather jacket", "L", "Black", 99.99, "Jackets");

        when(clothesRepository.findById(1L)).thenReturn(Optional.of(clothes));

        Optional<Clothes> foundClothes = clothesService.getClothesById(1L);

        assertTrue(foundClothes.isPresent());
        assertEquals("Jacket", foundClothes.get().getName());
    }

    @Test
    public void testGetClothesByIdNotFound() {
        when(clothesRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Clothes> foundClothes = clothesService.getClothesById(1L);

        assertFalse(foundClothes.isPresent());
    }

    @Test
    public void testDeleteClothesById() {
        doNothing().when(clothesRepository).deleteById(1L);

        String result = clothesService.deleteClothesById(1L);

        assertEquals("Product 1 deleted successfully.", result);
    }

    @Test
    public void testFindByName() {
        Clothes clothes = new Clothes("T-Shirt", "Cotton T-shirt", "M", "Blue", 19.99, "Shirts");

        when(clothesRepository.findByNameContaining("T-Shirt")).thenReturn(List.of(clothes));

        List<Clothes> foundClothes = clothesService.findByName("T-Shirt");

        assertNotNull(foundClothes);
        assertEquals(1, foundClothes.size());
        assertEquals("T-Shirt", foundClothes.get(0).getName());
    }

    @Test
    public void testFindByCategory() {
        Clothes clothes = new Clothes("Jeans", "Denim jeans", "L", "Black", 39.99, "Pants");

        when(clothesRepository.findByCategory("Pants")).thenReturn(List.of(clothes));

        List<Clothes> foundClothes = clothesService.findByCategory("Pants");

        assertNotNull(foundClothes);
        assertEquals(1, foundClothes.size());
        assertEquals("Pants", foundClothes.get(0).getCategory());
    }
}
