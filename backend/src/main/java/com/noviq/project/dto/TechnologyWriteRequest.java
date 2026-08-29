package com.noviq.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TechnologyWriteRequest(@NotBlank @Size(max = 100) String name) {
}
