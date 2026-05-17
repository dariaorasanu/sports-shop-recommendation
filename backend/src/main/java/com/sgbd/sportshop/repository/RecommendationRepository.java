package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.RecommendationResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecommendationRepository {

    private final JdbcTemplate jdbcTemplate;

    public RecommendationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<RecommendationResponse> findByUserId(Integer userId) {
        String sql = """
                SELECT id_recomandare,
                       id_utilizator,
                       nume,
                       prenume,
                       email,
                       id_chestionar,
                       obiectiv,
                       nivel_utilizator,
                       buget_estimat,
                       id_sport,
                       sport_recomandat,
                       mediu,
                       tip_activitate,
                       nivel_efort,
                       scor_compatibilitate,
                       nivel_recomandat,
                       data_recomandare
                FROM view_recomandari_utilizatori
                WHERE id_utilizator = ?
                ORDER BY scor_compatibilitate DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new RecommendationResponse(
                rs.getInt("id_recomandare"),
                rs.getInt("id_utilizator"),
                rs.getString("nume"),
                rs.getString("prenume"),
                rs.getString("email"),
                rs.getInt("id_chestionar"),
                rs.getString("obiectiv"),
                rs.getString("nivel_utilizator"),
                rs.getBigDecimal("buget_estimat"),
                rs.getInt("id_sport"),
                rs.getString("sport_recomandat"),
                rs.getString("mediu"),
                rs.getString("tip_activitate"),
                rs.getInt("nivel_efort"),
                rs.getBigDecimal("scor_compatibilitate"),
                rs.getString("nivel_recomandat"),
                rs.getTimestamp("data_recomandare").toLocalDateTime()
        ), userId);
    }
    public List<RecommendationResponse> findByQuestionnaireId(Integer questionnaireId) {
        String sql = """
            SELECT id_recomandare,
                   id_utilizator,
                   nume,
                   prenume,
                   email,
                   id_chestionar,
                   obiectiv,
                   nivel_utilizator,
                   buget_estimat,
                   id_sport,
                   sport_recomandat,
                   mediu,
                   tip_activitate,
                   nivel_efort,
                   scor_compatibilitate,
                   nivel_recomandat,
                   data_recomandare
            FROM view_recomandari_utilizatori
            WHERE id_chestionar = ?
            ORDER BY scor_compatibilitate DESC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new RecommendationResponse(
                rs.getInt("id_recomandare"),
                rs.getInt("id_utilizator"),
                rs.getString("nume"),
                rs.getString("prenume"),
                rs.getString("email"),
                rs.getInt("id_chestionar"),
                rs.getString("obiectiv"),
                rs.getString("nivel_utilizator"),
                rs.getBigDecimal("buget_estimat"),
                rs.getInt("id_sport"),
                rs.getString("sport_recomandat"),
                rs.getString("mediu"),
                rs.getString("tip_activitate"),
                rs.getInt("nivel_efort"),
                rs.getBigDecimal("scor_compatibilitate"),
                rs.getString("nivel_recomandat"),
                rs.getTimestamp("data_recomandare").toLocalDateTime()
        ), questionnaireId);
    }
}