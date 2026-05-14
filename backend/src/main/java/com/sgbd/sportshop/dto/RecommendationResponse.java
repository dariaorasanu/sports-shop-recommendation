package com.sgbd.sportshop.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RecommendationResponse(
        Integer idRecomandare,
        Integer idUtilizator,
        String nume,
        String prenume,
        String email,
        Integer idChestionar,
        String obiectiv,
        String nivelUtilizator,
        Integer idSport,
        String sportRecomandat,
        String mediu,
        String tipActivitate,
        Integer nivelEfort,
        BigDecimal scorCompatibilitate,
        String nivelRecomandat,
        LocalDateTime dataRecomandare
) {
}