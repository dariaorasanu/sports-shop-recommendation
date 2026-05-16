package com.sgbd.sportshop.dto;

import java.time.LocalDate;

public record RegisterRequest(
        String nume,
        String prenume,
        LocalDate dataNastere,
        String email,
        String telefon,
        String parola
) {
}