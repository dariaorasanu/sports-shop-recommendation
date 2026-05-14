package com.sgbd.sportshop.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record UserResponse(
        Integer idUtilizator,
        String nume,
        String prenume,
        LocalDate dataNastere,
        String email,
        String telefon,
        LocalDateTime dataInregistrare
) {
}