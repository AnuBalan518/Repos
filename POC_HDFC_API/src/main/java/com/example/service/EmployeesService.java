package com.example.service;

import com.example.dto.ProductTypeDTO;
import com.example.entity.Employees;
import com.example.entity.ProductType;
import com.example.repository.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.utils.ProductTypeMapper.toEntity;

@Service
public class EmployeesService implements UserDetailsService {

	private final EmployeesRepository employeesRepository;

	@Autowired
	public EmployeesService(EmployeesRepository employeesRepository) {
		this.employeesRepository = employeesRepository;
	}

	public boolean isValidUser(String name, String password) {
		return employeesRepository.findByUsername(name)
				.map(user -> user.getPassword().equals(password))
				.orElse(false);
	}

	public List<Employees> getAllActiveEmployees() {
		return employeesRepository.findByStatus("A");
	}

	public Employees save(Employees employee) {
		return employeesRepository.save(employee);
	}

	@Override
	public UserDetails loadUserByUsername(String username) {
		// Fetch the Login entity from the repository
		Employees login = employeesRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

		// Return a UserDetails object (Spring Security's User class)
		return User.builder()
				.username(login.getUsername())
				.password(login.getPassword())
				.roles(login.getRole()) // Assuming login.getRole() gives a role like "ADMIN" or "USER"
				.build();
	}

	public Employees getEmployeeById (Integer id) {
		Employees employee = employeesRepository.getEmployeeById(id);
		return employee;
		//return convertToDto(productType);
	}

	public Optional<Employees> update(Integer id, Employees updatedData) {
		return employeesRepository.findById(id).map(existing -> {
			Employees updatedEntity = updatedData;
			updatedEntity.setId(id);
			return employeesRepository.save(updatedEntity);
		});
	}

	public String deleteEmployee(Integer id) {
		//repository.deleteById(id);
		return employeesRepository.findById(id).map(existing -> {
			existing.setStatus("D");
			employeesRepository.save(existing);
			return "Employee status updated to 'D'";
		}).orElse("Employee not found");
		//return "ProductType has been deleted.";
	}
}
