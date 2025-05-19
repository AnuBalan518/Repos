package com.example.service;

import com.example.entity.AppConfig;
import com.example.repository.AppConfigRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppConfigService {

	private final AppConfigRepository repository;

	public AppConfigService(AppConfigRepository repository) {
		this.repository = repository;
	}

	public List<AppConfig> getAll() {
		return repository.findAll();
	}

	public List<AppConfig> getByCategory(String category) {
		return repository.findByCategory(category);
	}

	public Optional<AppConfig> getByCategoryAndKey(String category, String key) {
		return repository.findByCategoryAndConfigKey(category, key);
	}

	public AppConfig save(AppConfig config) {
		return repository.save(config);
	}

	public void delete(Integer id) {
		repository.deleteById(id);
	}


}
