package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.QuestionnaireRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionnaireRepository {

    private final JdbcTemplate jdbcTemplate;

    public QuestionnaireRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Integer createQuestionnaire(QuestionnaireRequest request) {
        String sql = """
                INSERT INTO chestionare (
                    id_utilizator,
                    timp_liber_ore,
                    nivel_activitate,
                    obiectiv,
                    restrictii_medicale,
                    buget_estimat,
                    preferinta_tip_activitate,
                    preferinta_mediu,
                    toleranta_efort
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING id_chestionar
                """;

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                request.idUtilizator(),
                request.timpLiberOre(),
                request.nivelActivitate(),
                request.obiectiv(),
                request.restrictiiMedicale(),
                request.bugetEstimat(),
                request.preferintaTipActivitate(),
                request.preferintaMediu(),
                request.tolerantaEfort()
        );
    }

    public void generateRecommendations(Integer questionnaireId) {
        String sql = "CALL genereaza_recomandari(?)";
        jdbcTemplate.update(sql, questionnaireId);
    }


}