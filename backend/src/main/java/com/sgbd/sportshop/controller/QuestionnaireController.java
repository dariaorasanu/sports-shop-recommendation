package com.sgbd.sportshop.controller;

import com.sgbd.sportshop.dto.QuestionnaireRequest;
import com.sgbd.sportshop.dto.RecommendationResponse;
import com.sgbd.sportshop.service.QuestionnaireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questionnaires")
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    public QuestionnaireController(QuestionnaireService questionnaireService) {
        this.questionnaireService = questionnaireService;
    }

    @PostMapping
    public ResponseEntity<List<RecommendationResponse>> createQuestionnaire(
            @RequestBody QuestionnaireRequest request
    ) {
        List<RecommendationResponse> recommendations =
                questionnaireService.createQuestionnaireAndGenerateRecommendations(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(recommendations);
    }
}