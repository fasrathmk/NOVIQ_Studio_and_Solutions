package com.noviq.common.dto;

import jakarta.validation.constraints.NotNull;

public record ReorderRequest(@NotNull Integer displayOrder) {
}
