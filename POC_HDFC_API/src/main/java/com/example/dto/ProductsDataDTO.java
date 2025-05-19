package com.example.dto;

import com.example.entity.Products;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


public class ProductsDataDTO {

    @NotNull(message = "ID cannot be null")
    private Integer id;

    @NotNull(message = "Product Id cannot be null")
    private Products products;

    @NotBlank(message = "Product Category cannot be blank")
    private String category;

    @NotBlank(message = "Product Category config key cannot be blank")
    private String configKey;

    @NotNull(message = "Created by cannot be null")
    private Integer createdBy;

    @NotNull(message = "Modified by cannot be null")
    private Integer modifiedBy;

    @NotNull(message = "Created at cannot be null")
    private LocalDateTime createdAt;

    @NotNull(message = "Updated at cannot be null")
    private LocalDateTime updatedAt;

    @NotNull(message = "Status cannot be null")
    private String status;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }



    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getConfigKey() {
        return configKey;
    }

    public void setConfigKey(String configKey) {
        this.configKey = configKey;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Integer modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

//    public Products getProducts() {
//        return products;
//    }
//
//    public void setProducts(Products products) {
//        this.products = products;
//    }
}
