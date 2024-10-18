package com.example.online_store.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "clothes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;

    @NotNull
    @Column(name = "name")
    private String name;

    @Size(min = 2, max = 500)
    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private String size;

    @Column(name = "color")
    private String color;

    @NotNull
    @Positive
    @Column(name = "price")
    private double price;

    @Column(name = "category")
    private String category;

    @Column(name = "imageUrl")
    private String imageUrl;

    public Clothes(String name, String description, String size, String color, double price, String category) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.price = price;
        this.category = category;
        this.description = description;
    }

    public Clothes(String name, String description, String size, String color, double price, String category, String imageUrl) {
        this.name = name;
        this.description = description;
        this.size = size;
        this.color = color;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}
