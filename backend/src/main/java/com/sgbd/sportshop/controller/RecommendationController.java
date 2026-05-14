package com.sgbd.sportshop.controller;

import com.sgbd.sportshop.dto.RecommendationResponse;
import com.sgbd.sportshop.service.RecommendationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/user/{userId}")
    public List<RecommendationResponse> getRecommendationsByUserId(@PathVariable Integer userId) {
        return recommendationService.getRecommendationsByUserId(userId);
    }
}