package com.sgbd.sportshop.dto;

import java.math.BigDecimal;

public record QuestionnaireRequest(
        Integer idUtilizator,
        Integer timpLiberOre,
        String nivelActivitate,
        String obiectiv,
        String restrictiiMedicale,
        BigDecimal bugetEstimat,
        String preferintaTipActivitate,
        String preferintaMediu,
        Integer tolerantaEfort
) {
}