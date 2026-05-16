package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.UserResponse;
import com.sgbd.sportshop.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.sgbd.sportshop.dto.AuthResponse;
import com.sgbd.sportshop.dto.LoginRequest;
import com.sgbd.sportshop.dto.RegisterRequest;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll();
    }
    public AuthResponse register(RegisterRequest request) {
        if (request.nume() == null || request.nume().isBlank()) {
            throw new IllegalArgumentException("Numele este obligatoriu.");
        }

        if (request.prenume() == null || request.prenume().isBlank()) {
            throw new IllegalArgumentException("Prenumele este obligatoriu.");
        }

        if (request.email() == null || request.email().isBlank()) {
            throw new IllegalArgumentException("Email-ul este obligatoriu.");
        }

        if (request.parola() == null || request.parola().isBlank()) {
            throw new IllegalArgumentException("Parola este obligatorie.");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Există deja un utilizator cu acest email.");
        }

        return userRepository.createUser(request);
    }

    public AuthResponse login(LoginRequest request) {
        if (request.email() == null || request.email().isBlank()) {
            throw new IllegalArgumentException("Email-ul este obligatoriu.");
        }

        if (request.parola() == null || request.parola().isBlank()) {
            throw new IllegalArgumentException("Parola este obligatorie.");
        }

        return userRepository.findByEmailAndPassword(request)
                .orElseThrow(() -> new IllegalArgumentException("Email sau parolă greșită."));
    }
}
