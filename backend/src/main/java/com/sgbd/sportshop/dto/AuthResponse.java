package com.sgbd.sportshop.dto;

public record AuthResponse(
        Integer idUtilizator,
        String nume,
        String prenume,
        String email
) {
}