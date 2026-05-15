package com.sgbd.sportshop.dto;

public record SportResponse(
        Integer idSport,
        String denumire,
        String mediu,
        Integer nivelEfort,
        String tipActivitate,
        String obiectivPrincipal,
        String descriere
) {
}