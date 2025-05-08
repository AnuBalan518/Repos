package com.example.service;

import com.example.entity.Login;
import com.example.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class LoginService implements UserDetailsService {

	private final LoginRepository loginRepository;

	@Autowired
	public LoginService(LoginRepository loginRepository) {
		this.loginRepository = loginRepository;
	}

	public boolean isValidUser(String name, String password) {
		return loginRepository.findByName(name)
				.map(user -> user.getPassword().equals(password))
				.orElse(false);
	}

	public Login save(Login login) {
		return loginRepository.save(login);
	}

	@Override
	public UserDetails loadUserByUsername(String username) {
		// Fetch the Login entity from the repository
		Login login = loginRepository.findByName(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

		// Return a UserDetails object (Spring Security's User class)
		return User.builder()
				.username(login.getName())
				.password(login.getPassword())
				.roles(login.getRole()) // Assuming login.getRole() gives a role like "ADMIN" or "USER"
				.build();
	}
}
