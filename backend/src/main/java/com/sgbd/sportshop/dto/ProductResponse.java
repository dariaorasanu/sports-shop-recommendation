package com.sgbd.sportshop.dto;

import java.math.BigDecimal;

public record ProductResponse(
        Integer idProdus,
        String produs,
        BigDecimal pret,
        Integer stoc,
        String nivelRecomandat,
        Integer idCategorie,
        String categorie,
        Integer idSport,
        String sport,
        String mediu,
        String tipActivitate
) {
}