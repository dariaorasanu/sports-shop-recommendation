package com.sgbd.sportshop.dto;

public record LoginRequest(
        String email,
        String parola
) {
}