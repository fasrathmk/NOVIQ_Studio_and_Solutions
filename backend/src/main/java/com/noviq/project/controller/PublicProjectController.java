package com.noviq.project.controller;

import com.noviq.common.dto.PageResponse;
import com.noviq.project.dto.ProjectCardResponse;
import com.noviq.project.dto.ProjectDetailResponse;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/projects")
public class PublicProjectController {

    private final ProjectService projectService;

    public PublicProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public PageResponse<ProjectCardResponse> list(
            @RequestParam(required = false) ProjectCategory category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        return projectService.listPublic(category, page, size);
    }

    @GetMapping("/featured")
    public List<ProjectCardResponse> featured() {
        return projectService.featured();
    }

    @GetMapping("/{slug}")
    public ProjectDetailResponse get(@PathVariable String slug) {
        return projectService.getPublicBySlug(slug);
    }
}
