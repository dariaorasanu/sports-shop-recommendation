package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.UserResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<UserResponse> findAll() {
        String sql = """
                SELECT id_utilizator,
                       nume,
                       prenume,
                       data_nastere,
                       email,
                       telefon,
                       data_inregistrare
                FROM utilizatori
                ORDER BY id_utilizator
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new UserResponse(
                rs.getInt("id_utilizator"),
                rs.getString("nume"),
                rs.getString("prenume"),
                rs.getDate("data_nastere").toLocalDate(),
                rs.getString("email"),
                rs.getString("telefon"),
                rs.getTimestamp("data_inregistrare").toLocalDateTime()
        ));
    }
}