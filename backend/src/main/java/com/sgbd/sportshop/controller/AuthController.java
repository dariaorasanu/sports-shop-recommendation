package com.sgbd.sportshop.controller;

import com.sgbd.sportshop.dto.AuthResponse;
import com.sgbd.sportshop.dto.LoginRequest;
import com.sgbd.sportshop.dto.RegisterRequest;
import com.sgbd.sportshop.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}