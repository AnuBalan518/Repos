package com.example.repository;

import com.example.entity.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppConfigRepository extends JpaRepository<AppConfig, Integer> {
	List<AppConfig> findByCategory(String category);
	Optional<AppConfig> findByCategoryAndConfigKey(String category, String configKey);
	Optional<AppConfig> findByConfigKey(String configKey);
}
