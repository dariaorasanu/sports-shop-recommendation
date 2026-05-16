package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.UserResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.sgbd.sportshop.dto.AuthResponse;
import com.sgbd.sportshop.dto.LoginRequest;
import com.sgbd.sportshop.dto.RegisterRequest;
import java.util.Optional;
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
    public boolean existsByEmail(String email) {
        String sql = """
            SELECT COUNT(*)
            FROM utilizatori
            WHERE email = ?
            """;

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);

        return count != null && count > 0;
    }

    public AuthResponse createUser(RegisterRequest request) {
        String sql = """
            INSERT INTO utilizatori (
                nume,
                prenume,
                data_nastere,
                email,
                telefon,
                parola
            )
            VALUES (?, ?, ?, ?, ?, ?)
            RETURNING id_utilizator, nume, prenume, email
            """;

        return jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> new AuthResponse(
                        rs.getInt("id_utilizator"),
                        rs.getString("nume"),
                        rs.getString("prenume"),
                        rs.getString("email")
                ),
                request.nume(),
                request.prenume(),
                request.dataNastere(),
                request.email(),
                request.telefon(),
                request.parola()
        );
    }

    public Optional<AuthResponse> findByEmailAndPassword(LoginRequest request) {
        String sql = """
            SELECT id_utilizator,
                   nume,
                   prenume,
                   email
            FROM utilizatori
            WHERE email = ?
              AND parola = ?
            """;

        List<AuthResponse> users = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new AuthResponse(
                        rs.getInt("id_utilizator"),
                        rs.getString("nume"),
                        rs.getString("prenume"),
                        rs.getString("email")
                ),
                request.email(),
                request.parola()
        );

        return users.stream().findFirst();
    }
}