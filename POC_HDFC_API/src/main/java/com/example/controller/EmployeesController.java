package com.example.controller;

import com.example.dto.ProductTypeDTO;
import com.example.entity.Employees;
import com.example.entity.ProductType;
import com.example.repository.EmployeesRepository;
import com.example.service.EmployeesService;
import com.example.service.ProductTypeService;
import com.example.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class EmployeesController {

	@Autowired
	private EmployeesRepository employeesRepository;

	@Autowired
	private JwtUtil jwtUtil;

    @Autowired
    private EmployeesService employeesService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employees employees) {
        Optional<Employees> userOpt = employeesRepository.findByUsername(employees.getUsername());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(employees.getPassword())) {
            employees.setUsername(userOpt.get().getUsername());
            String token = jwtUtil.generateToken(employees, userOpt.get().getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("firstname", userOpt.get().getFirstname());
            response.put("role", userOpt.get().getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/login/active")
    public List<Employees> getAllActiveEmployees() {
        return employeesService.getAllActiveEmployees();
    }
    @PostMapping("/login/create")
    public ResponseEntity<?> create(@Valid @RequestBody Employees dto) {
        Employees created = employeesService.save(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/login/{id}")
    public Employees getEmployeeById(@PathVariable Integer id) {
        return employeesService.getEmployeeById(id);
    }

    // UPDATE
    @PutMapping("/login/update/{id}")
    @PreAuthorize("hasRole('checker')")
    public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody Employees dto) {

        Optional<Employees> updated = employeesService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/login/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        String result = employeesService.deleteEmployee(id);
        return ResponseEntity.ok(result);
    }
}
