package com.noviq.project.dto;

public record ProjectImageResponse(
        String id,
        String imageUrl,
        String altText,
        String caption,
        int displayOrder
) {
}
