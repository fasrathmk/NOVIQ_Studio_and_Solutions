package com.noviq.auth.dto;

public record AdminProfileResponse(
        String id,
        String email,
        String fullName,
        String role
) {
}
