package com.sgbd.sportshop.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderDetailsResponse(
        Integer idComanda,
        Integer idUtilizator,
        String nume,
        String prenume,
        String email,
        LocalDateTime dataComanda,
        String status,
        BigDecimal total,
        String adresaLivrare
) {
}