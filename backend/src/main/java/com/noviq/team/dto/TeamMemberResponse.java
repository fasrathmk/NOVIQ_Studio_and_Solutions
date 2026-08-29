package com.noviq.team.dto;

public record TeamMemberResponse(
        String id,
        String name,
        String role,
        String biography,
        String imageUrl,
        String linkedinUrl,
        String behanceUrl,
        String githubUrl,
        boolean active,
        int displayOrder
) {
}
