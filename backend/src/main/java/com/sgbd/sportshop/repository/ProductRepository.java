package com.sgbd.sportshop.repository;

import com.sgbd.sportshop.dto.ProductResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ProductResponse> findAllAvailable() {
        String sql = """
                SELECT id_produs,
                       produs,
                       pret,
                       stoc,
                       nivel_recomandat,
                       id_categorie,
                       categorie,
                       id_sport,
                       sport,
                       mediu,
                       tip_activitate
                FROM view_produse_disponibile
                ORDER BY sport, pret
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new ProductResponse(
                rs.getInt("id_produs"),
                rs.getString("produs"),
                rs.getBigDecimal("pret"),
                rs.getInt("stoc"),
                rs.getString("nivel_recomandat"),
                rs.getInt("id_categorie"),
                rs.getString("categorie"),
                rs.getInt("id_sport"),
                rs.getString("sport"),
                rs.getString("mediu"),
                rs.getString("tip_activitate")
        ));
    }

    public List<ProductResponse> findAvailableBySport(Integer sportId) {
        String sql = """
                SELECT id_produs,
                       produs,
                       pret,
                       stoc,
                       nivel_recomandat,
                       id_categorie,
                       categorie,
                       id_sport,
                       sport,
                       mediu,
                       tip_activitate
                FROM view_produse_disponibile
                WHERE id_sport = ?
                ORDER BY pret
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new ProductResponse(
                rs.getInt("id_produs"),
                rs.getString("produs"),
                rs.getBigDecimal("pret"),
                rs.getInt("stoc"),
                rs.getString("nivel_recomandat"),
                rs.getInt("id_categorie"),
                rs.getString("categorie"),
                rs.getInt("id_sport"),
                rs.getString("sport"),
                rs.getString("mediu"),
                rs.getString("tip_activitate")
        ), sportId);
    }
}