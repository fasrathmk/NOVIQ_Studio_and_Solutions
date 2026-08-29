package com.noviq.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProjectImageWriteRequest(
        @NotBlank @Size(max = 1000) String imageUrl,
        @Size(max = 250) String altText,
        @Size(max = 500) String caption,
        @NotNull Integer displayOrder
) {
}
