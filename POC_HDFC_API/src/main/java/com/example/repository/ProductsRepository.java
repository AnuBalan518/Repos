package com.example.repository;

import com.example.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    Products getProductTypeById(Integer id);

    List<Products> findByStatus(String status);

    //Entity Name to be referred
    @Query("SELECT COUNT(e) FROM Products e WHERE e.approval_status = :approval_status AND e.status = :status")
    long countByApprovalstatusAndStatus(@Param("approval_status") String approval_status, @Param("status") String status);

}
