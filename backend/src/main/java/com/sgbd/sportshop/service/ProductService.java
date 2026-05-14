package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.ProductResponse;
import com.sgbd.sportshop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getAvailableProducts() {
        return productRepository.findAllAvailable();
    }

    public List<ProductResponse> getAvailableProductsBySport(Integer sportId) {
        return productRepository.findAvailableBySport(sportId);
    }
}