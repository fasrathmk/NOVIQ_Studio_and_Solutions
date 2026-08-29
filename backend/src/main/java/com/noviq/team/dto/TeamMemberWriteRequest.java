package com.noviq.team.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TeamMemberWriteRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Size(max = 150) String role,
        @Size(max = 1000) String biography,
        @Size(max = 1000) String imageUrl,
        @Size(max = 500) String linkedinUrl,
        @Size(max = 500) String behanceUrl,
        @Size(max = 500) String githubUrl,
        Boolean active,
        Integer displayOrder
) {
}
