package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.OrderDetailsResponse;
import com.sgbd.sportshop.dto.OrderRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository {

    private final JdbcTemplate jdbcTemplate;

    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void placeOrder(OrderRequest request) {
        String sql = "CALL plaseaza_comanda(?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                request.idUtilizator(),
                request.idProdus(),
                request.cantitate(),
                request.adresaLivrare()
        );
    }

    public List<OrderDetailsResponse> findAll() {
        String sql = """
                SELECT id_comanda,
                       id_utilizator,
                       nume,
                       prenume,
                       email,
                       data_comanda,
                       status,
                       total,
                       adresa_livrare
                FROM view_comenzi_utilizatori
                ORDER BY data_comanda DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new OrderDetailsResponse(
                rs.getInt("id_comanda"),
                rs.getInt("id_utilizator"),
                rs.getString("nume"),
                rs.getString("prenume"),
                rs.getString("email"),
                rs.getTimestamp("data_comanda").toLocalDateTime(),
                rs.getString("status"),
                rs.getBigDecimal("total"),
                rs.getString("adresa_livrare")
        ));
    }

    public List<OrderDetailsResponse> findByUserId(Integer userId) {
        String sql = """
                SELECT id_comanda,
                       id_utilizator,
                       nume,
                       prenume,
                       email,
                       data_comanda,
                       status,
                       total,
                       adresa_livrare
                FROM view_comenzi_utilizatori
                WHERE id_utilizator = ?
                ORDER BY data_comanda DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new OrderDetailsResponse(
                rs.getInt("id_comanda"),
                rs.getInt("id_utilizator"),
                rs.getString("nume"),
                rs.getString("prenume"),
                rs.getString("email"),
                rs.getTimestamp("data_comanda").toLocalDateTime(),
                rs.getString("status"),
                rs.getBigDecimal("total"),
                rs.getString("adresa_livrare")
        ), userId);
    }
}