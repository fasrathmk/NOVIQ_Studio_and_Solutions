package com.noviq.common.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record IdOrderRequest(@NotEmpty List<UUID> ids) {
}
