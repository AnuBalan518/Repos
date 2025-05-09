package com.example.repository;

import com.example.entity.Employees;
import com.example.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Long> {
    Optional<Employees> findByUsername(String username);

    Employees getEmployeeById(Integer id);

    List<Employees> findByStatus(String status);

    Optional<Employees> findById(Integer id);
}
