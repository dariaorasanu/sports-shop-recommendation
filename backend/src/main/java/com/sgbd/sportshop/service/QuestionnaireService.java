package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.QuestionnaireRequest;
import com.sgbd.sportshop.dto.RecommendationResponse;
import com.sgbd.sportshop.repository.QuestionnaireRepository;
import com.sgbd.sportshop.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final RecommendationRepository recommendationRepository;

    public QuestionnaireService(
            QuestionnaireRepository questionnaireRepository,
            RecommendationRepository recommendationRepository
    ) {
        this.questionnaireRepository = questionnaireRepository;
        this.recommendationRepository = recommendationRepository;
    }

    public List<RecommendationResponse> createQuestionnaireAndGenerateRecommendations(
            QuestionnaireRequest request
    ) {
        Integer questionnaireId = questionnaireRepository.createQuestionnaire(request);

        questionnaireRepository.generateRecommendations(questionnaireId);

        return recommendationRepository.findByQuestionnaireId(questionnaireId);    }
}