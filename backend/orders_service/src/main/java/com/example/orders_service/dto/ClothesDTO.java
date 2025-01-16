package com.example.orders_service.dto;

import lombok.Data;

@Data
public class ClothesDTO {
    private Long id;
    private String name;
    private String description;
    private String size;
    private String color;
    private double price;
    private String category;
    private String imageUrl;
}
