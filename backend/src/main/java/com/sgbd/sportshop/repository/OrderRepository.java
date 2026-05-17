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
            SELECT c.id_comanda AS id_comanda,
                   c.id_utilizator AS id_utilizator,
                   u.nume AS nume,
                   u.prenume AS prenume,
                   u.email AS email,
                   c.data_comanda AS data_comanda,
                   c.status AS status,
                   c.total AS total,
                   c.adresa_livrare AS adresa_livrare,
                   p.id_produs AS id_produs,
                   p.denumire AS produs,
                   dc.cantitate AS cantitate,
                   dc.pret_unitar AS pret_unitar
            FROM comenzi c
            JOIN utilizatori u ON c.id_utilizator = u.id_utilizator
            JOIN detalii_comanda dc ON c.id_comanda = dc.id_comanda
            JOIN produse p ON dc.id_produs = p.id_produs
            ORDER BY c.data_comanda DESC
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
                rs.getString("adresa_livrare"),
                rs.getInt("id_produs"),
                rs.getString("produs"),
                rs.getInt("cantitate"),
                rs.getBigDecimal("pret_unitar")
        ));
    }

    public List<OrderDetailsResponse> findByUserId(Integer userId) {
        String sql = """
            SELECT c.id_comanda AS id_comanda,
                   c.id_utilizator AS id_utilizator,
                   u.nume AS nume,
                   u.prenume AS prenume,
                   u.email AS email,
                   c.data_comanda AS data_comanda,
                   c.status AS status,
                   c.total AS total,
                   c.adresa_livrare AS adresa_livrare,
                   p.id_produs AS id_produs,
                   p.denumire AS produs,
                   dc.cantitate AS cantitate,
                   dc.pret_unitar AS pret_unitar
            FROM comenzi c
            JOIN utilizatori u ON c.id_utilizator = u.id_utilizator
            JOIN detalii_comanda dc ON c.id_comanda = dc.id_comanda
            JOIN produse p ON dc.id_produs = p.id_produs
            WHERE c.id_utilizator = ?
            ORDER BY c.data_comanda DESC
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
                rs.getString("adresa_livrare"),
                rs.getInt("id_produs"),
                rs.getString("produs"),
                rs.getInt("cantitate"),
                rs.getBigDecimal("pret_unitar")
        ), userId);
    }
}