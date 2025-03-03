package com.example.orders_service.dto;

import lombok.Data;

@Data
public class ItemDTO {
    private String category;
    private String color;
    private String description;
    private Long id;
    private String imageUrl;
    private String name;
    private double price;
    private int quantity;
    private String size;
}
