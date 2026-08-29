package com.noviq.project.controller;

import com.noviq.project.dto.TechnologyResponse;
import com.noviq.project.dto.TechnologyWriteRequest;
import com.noviq.project.service.TechnologyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/technologies")
public class AdminTechnologyController {

    private final TechnologyService technologyService;

    public AdminTechnologyController(TechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    @GetMapping
    public List<TechnologyResponse> list() {
        return technologyService.list();
    }

    @PostMapping
    public ResponseEntity<TechnologyResponse> create(@Valid @RequestBody TechnologyWriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(technologyService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        technologyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
