package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.SportResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SportRepository {

    private final JdbcTemplate jdbcTemplate;

    public SportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<SportResponse> findAll() {
        String sql = """
                SELECT id_sport,
                       denumire,
                       mediu,
                       nivel_efort,
                       tip_activitate,
                       obiectiv_principal,
                       descriere
                FROM sporturi
                ORDER BY denumire
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new SportResponse(
                rs.getInt("id_sport"),
                rs.getString("denumire"),
                rs.getString("mediu"),
                rs.getInt("nivel_efort"),
                rs.getString("tip_activitate"),
                rs.getString("obiectiv_principal"),
                rs.getString("descriere")
        ));
    }
}