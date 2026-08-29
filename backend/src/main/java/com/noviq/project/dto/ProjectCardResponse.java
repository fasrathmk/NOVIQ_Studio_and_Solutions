package com.noviq.project.dto;

import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;

import java.util.List;

public record ProjectCardResponse(
        String id,
        String title,
        String slug,
        ProjectCategory category,
        String shortDescription,
        String coverImageUrl,
        String coverImageAlt,
        List<String> technologies,
        boolean featured,
        boolean demonstration,
        ProjectStatus status,
        int displayOrder,
        Integer projectYear
) {
}
