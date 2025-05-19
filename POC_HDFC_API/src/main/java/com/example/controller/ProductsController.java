package com.example.controller;

import com.example.dto.ProductsDTO;
import com.example.entity.Products;
import com.example.entity.ProductsData;
import com.example.service.ProductTypeService;
import com.example.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@Validated
public class ProductsController {

	@Autowired
	private ProductsService service;

	// CREATE
	@PostMapping("/create")
	public ResponseEntity<?> create(@Valid @RequestBody ProductsDTO dto) {
		Products products = new Products();
		products.setName(dto.getName());
		products.setCreatedBy(dto.getCreatedBy());

		System.out.println("Request URI: " + dto);
		//Products created = service.save(dto);
		Products created = service.saveProductWithDetails(dto,
				dto.getIntermediary(),
				dto.getPremiumtype(),
				dto.getFrequency(),
				dto.getCreatedBy());

		return ResponseEntity.ok(created);
	}

	// READ
//	@GetMapping("/all")
//	public ResponseEntity<List<ProductTypeDTO>> getAll() {
//		return ResponseEntity.ok(service.getAll());
//	}

	@GetMapping("/all")
	public ResponseEntity<List<ProductsDTO>> getAll() {
		return ResponseEntity.ok(service.getAllActive());
	}


	@GetMapping("/{id}")
	public Products getProductTypeById(@PathVariable Integer id) {
		return service.getProductTypeById(id);
	}

	// UPDATE
//	@PutMapping("/update/{id}")
//	@PreAuthorize("hasRole('maker')")
//	public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody ProductsDTO dto) {
//		//service.validateBusinessRules(dto);
//		Products updated = service.update(id, dto)
//				.orElseThrow(() -> new RuntimeException("Product not found"));
//		return ResponseEntity.ok(updated);
//	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('maker')")
	public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody ProductsDTO dto) {
		Optional<Products> updated = service.update(id, dto);

		if (updated.isPresent()) {
			return ResponseEntity.ok().body(dto);  // ✅ Return the actual product object
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Product not found");
		}
	}



	@PutMapping("/approve/{id}")
	@PreAuthorize("hasRole('checker')")
	public ResponseEntity<?> approve(@PathVariable Integer id) {
		// Assuming you are not updating the other fields, just the approval_status
		Products updated = service.updateApprovalStatus(id, "Approved");
		return ResponseEntity.ok(updated);
	}

	@PutMapping("/reject/{id}")
	@PreAuthorize("hasRole('checker')")
	public ResponseEntity<?> reject(@PathVariable Integer id) {
		// Assuming you are not updating the other fields, just the approval_status
		Products updated = service.updateApprovalStatus(id, "Rejected");
		return ResponseEntity.ok(updated);
	}

	// DELETE
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		String result = service.deleteProductType(id);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/count")
	public ResponseEntity<Long> getCountByApprovalstatusAndStatus(@RequestParam String approval_status) {
		long count = service.getCountByApprovalstatusAndStatus(approval_status);
		return ResponseEntity.ok(count);
	}
}
