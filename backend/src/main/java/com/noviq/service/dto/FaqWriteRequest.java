package com.noviq.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FaqWriteRequest(
        @NotBlank @Size(max = 500) String question,
        @NotBlank String answer,
        @NotNull Integer displayOrder
) {
}
