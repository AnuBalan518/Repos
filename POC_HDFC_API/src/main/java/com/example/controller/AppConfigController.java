package com.example.controller;

import com.example.entity.AppConfig;
import com.example.service.AppConfigService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/config")
@Validated
public class AppConfigController {
	@Autowired
	private final AppConfigService service;

	@Autowired
	private JwtUtil jwtUtil;

	public AppConfigController(AppConfigService service, JwtUtil jwtUtil) {
		this.service = service;
		this.jwtUtil = jwtUtil;
	}

	@GetMapping
	public List<AppConfig> getAll() {
		return service.getAll();
	}

	@GetMapping("/category/{category}")
	public List<AppConfig> getByCategory(@PathVariable String category) {
		return service.getByCategory(category);
	}

	@GetMapping("/{category}/{key}")
	public Optional<AppConfig> getByCategoryAndKey(@PathVariable String category, @PathVariable String key) {
		return service.getByCategoryAndKey(category, key);
	}

	@PostMapping
	public AppConfig createOrUpdate(@RequestBody AppConfig config) {
		return service.save(config);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		service.delete(id);
	}
}
