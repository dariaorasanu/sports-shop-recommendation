package com.sgbd.sportshop.controller;

import com.sgbd.sportshop.dto.SportResponse;
import com.sgbd.sportshop.service.SportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sports")
public class SportController {

    private final SportService sportService;

    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @GetMapping
    public List<SportResponse> getAllSports() {
        return sportService.getAllSports();
    }
}