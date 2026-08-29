package com.noviq.project.dto;

public record RelatedProjectResponse(
        String title,
        String slug,
        String category,
        String shortDescription,
        String coverImageUrl,
        String coverImageAlt
) {
}
