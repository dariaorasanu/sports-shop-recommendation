package com.sgbd.sportshop.service;

import com.sgbd.sportshop.dto.SportResponse;
import com.sgbd.sportshop.repository.SportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {

    private final SportRepository sportRepository;

    public SportService(SportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    public List<SportResponse> getAllSports() {
        return sportRepository.findAll();
    }
}