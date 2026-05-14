package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.UserResponse;
import com.sgbd.sportshop.repository.UserRepository;
import org.springframework.stereotype.Service;

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
}