package com.noviq.project.dto;

import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;

import java.util.List;

public record ProjectDetailResponse(
        String id,
        String title,
        String slug,
        String clientName,
        String industry,
        Integer projectYear,
        ProjectCategory category,
        String shortDescription,
        String coverImageUrl,
        String coverImageAlt,
        String overview,
        String challenge,
        String approach,
        String solution,
        String results,
        String servicesProvided,
        List<String> technologies,
        List<ProjectImageResponse> images,
        String liveUrl,
        String behanceUrl,
        String githubUrl,
        boolean featured,
        boolean demonstration,
        ProjectStatus status,
        int displayOrder,
        RelatedProjectResponse previousProject,
        RelatedProjectResponse nextProject
) {
}
