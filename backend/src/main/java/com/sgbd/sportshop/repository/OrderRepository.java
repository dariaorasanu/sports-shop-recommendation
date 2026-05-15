package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.OrderRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
}