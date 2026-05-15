package com.sgbd.sportshop.dto;

public record OrderRequest(
        Integer idUtilizator,
        Integer idProdus,
        Integer cantitate,
        String adresaLivrare
) {
}