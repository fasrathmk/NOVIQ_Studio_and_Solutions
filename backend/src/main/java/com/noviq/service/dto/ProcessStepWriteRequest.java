package com.noviq.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProcessStepWriteRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 1000) String description,
        @NotNull Integer displayOrder
) {
}
