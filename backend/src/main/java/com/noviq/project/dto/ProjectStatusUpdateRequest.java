package com.noviq.project.dto;

import com.noviq.project.entity.ProjectStatus;
import jakarta.validation.constraints.NotNull;

public record ProjectStatusUpdateRequest(@NotNull ProjectStatus status) {
}
