package com.noviq.project.dto;

import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectWriteRequest(
        @NotBlank @Size(max = 250) String title,
        @Size(max = 250) String slug,
        @Size(max = 200) String clientName,
        @Size(max = 150) String industry,
        Integer projectYear,
        @NotNull ProjectCategory category,
        @NotBlank @Size(max = 500) String shortDescription,
        @Size(max = 1000) String coverImageUrl,
        @Size(max = 250) String coverImageAlt,
        String overview,
        String challenge,
        String approach,
        String solution,
        String results,
        String servicesProvided,
        @Size(max = 500) String liveUrl,
        @Size(max = 500) String behanceUrl,
        @Size(max = 500) String githubUrl,
        Boolean featured,
        @NotNull Integer displayOrder,
        ProjectStatus status,
        Boolean demonstration,
        List<String> technologies,
        @Valid List<ProjectImageWriteRequest> images
) {
}
