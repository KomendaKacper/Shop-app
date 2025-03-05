package com.example.online_store.tests;

import com.example.online_store.controllers.ClothesController;
import com.example.online_store.entity.Clothes;
import com.example.online_store.services.ClothesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class ClothesControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ClothesService clothesService;

    @InjectMocks
    private ClothesController clothesController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(clothesController).build();
    }

    @Test
    public void testAddClothes() throws Exception {
        Clothes clothes = new Clothes("T-Shirt", "Cotton T-shirt", "M", "Blue", 19.99, "Shirts");

        when(clothesService.saveClothes(any(Clothes.class))).thenReturn(clothes);

        mockMvc.perform(post("/api/catalog/add")
                        .contentType("application/json")
                        .content("{\"name\":\"T-Shirt\",\"description\":\"Cotton T-shirt\",\"size\":\"M\",\"color\":\"Blue\",\"price\":19.99,\"category\":\"Shirts\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("T-Shirt"))
                .andExpect(jsonPath("$.price").value(19.99));
    }

    @Test
    public void testGetClothesById() throws Exception {
        Clothes clothes = new Clothes("T-Shirt", "Cotton T-shirt", "M", "Blue", 19.99, "Shirts");

        when(clothesService.getClothesById(1L)).thenReturn(Optional.of(clothes));

        mockMvc.perform(get("/api/catalog/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("T-Shirt"))
                .andExpect(jsonPath("$.price").value(19.99));
    }

    @Test
    public void testGetClothesByIdNotFound() throws Exception {
        when(clothesService.getClothesById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/catalog/products/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteClothesById() throws Exception {
        when(clothesService.deleteClothesById(1L)).thenReturn("Product 1 deleted successfully.");

        mockMvc.perform(delete("/api/catalog/products/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Product 1 deleted successfully."));
    }

    @Test
    public void testFilterByName() throws Exception {
        Clothes clothes = new Clothes("T-Shirt", "Cotton T-shirt", "M", "Blue", 19.99, "Shirts");

        when(clothesService.findByName("T-Shirt")).thenReturn(List.of(clothes));

        mockMvc.perform(get("/api/catalog/filter-by-names/T-Shirt"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("T-Shirt"));
    }

    @Test
    public void testFilterByCategory() throws Exception {
        Clothes clothes = new Clothes("Jeans", "Denim jeans", "L", "Black", 39.99, "Pants");

        when(clothesService.findByCategory("Pants")).thenReturn(List.of(clothes));

        mockMvc.perform(get("/api/catalog/filter-by-category/Pants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value("Pants"));
    }
}
