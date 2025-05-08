package com.example.repository;

import com.example.dto.ProductTypeDTO;
import com.example.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {
    ProductType getProductTypeById(Integer id);

    List<ProductType> findByStatus(String status);

}
