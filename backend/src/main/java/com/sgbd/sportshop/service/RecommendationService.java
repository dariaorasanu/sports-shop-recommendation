package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.RecommendationResponse;
import com.sgbd.sportshop.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public List<RecommendationResponse> getRecommendationsByUserId(Integer userId) {
        return recommendationRepository.findByUserId(userId);
    }
}