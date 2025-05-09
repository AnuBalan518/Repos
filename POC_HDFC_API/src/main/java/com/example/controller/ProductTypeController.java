package com.example.controller;

import com.example.dto.ProductTypeDTO;
import com.example.entity.ProductType;
import com.example.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-types")
@Validated
public class ProductTypeController {

	@Autowired
	private ProductTypeService service;

	// CREATE
	@PostMapping("/create")
	public ResponseEntity<?> create(@Valid @RequestBody ProductTypeDTO dto) {
		//service.validateBusinessRules(dto);
		System.out.println("Request URI: " + dto);
		ProductType created = service.save(dto);
		return ResponseEntity.ok(created);
	}

	// READ
//	@GetMapping("/all")
//	public ResponseEntity<List<ProductTypeDTO>> getAll() {
//		return ResponseEntity.ok(service.getAll());
//	}

	@GetMapping("/all")
	public ResponseEntity<List<ProductTypeDTO>> getAll() {
		return ResponseEntity.ok(service.getAllActive());
	}


	@GetMapping("/{id}")
	public ProductType getProductTypeById(@PathVariable Integer id) {
		return service.getProductTypeById(id);
	}

	// UPDATE
	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('maker')")
	public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody ProductTypeDTO dto) {
		//service.validateBusinessRules(dto);
		Optional<ProductType> updated = service.update(id, dto);
		return ResponseEntity.ok(updated);
	}

	@PutMapping("/approve/{id}")
	@PreAuthorize("hasRole('checker')")
	public ResponseEntity<?> approve(@PathVariable Integer id) {
		// Assuming you are not updating the other fields, just the approvalstatus
		ProductType updated = service.updateApprovalStatus(id, "Approved");
		return ResponseEntity.ok(updated);
	}

	@PutMapping("/reject/{id}")
	@PreAuthorize("hasRole('checker')")
	public ResponseEntity<?> reject(@PathVariable Integer id) {
		// Assuming you are not updating the other fields, just the approvalStatus
		ProductType updated = service.updateApprovalStatus(id, "Rejected");
		return ResponseEntity.ok(updated);
	}

	// DELETE
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		String result = service.deleteProductType(id);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/count")
	public ResponseEntity<Long> getCountByApprovalstatusAndStatus(@RequestParam String approvalstatus) {
		long count = service.getCountByApprovalstatusAndStatus(approvalstatus);
		return ResponseEntity.ok(count);
	}
}
