package com.example.repository;

import com.example.dto.ProductTypeDTO;
import com.example.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {
    ProductType getProductTypeById(Integer id);

    List<ProductType> findByStatus(String status);

    //Entity Name to be referred
    @Query("SELECT COUNT(e) FROM ProductType e WHERE e.approvalstatus = :approvalstatus AND e.status = :status")
    long countByApprovalstatusAndStatus(@Param("approvalstatus") String approvalstatus, @Param("status") String status);

}
