package com.example.controller;

import com.example.entity.AppConfig;
import com.example.entity.Login;
import com.example.repository.LoginRepository;

import com.example.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

	@Autowired
	private LoginRepository loginRepo;

	@Autowired
	private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        Optional<Login> userOpt = loginRepo.findByName(login.getName());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(login.getPassword())) {
            login.setName(userOpt.get().getName());
            String token = jwtUtil.generateToken(login, userOpt.get().getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", userOpt.get().getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
