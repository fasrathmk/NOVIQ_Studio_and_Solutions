package com.noviq.testimonial.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record TestimonialWriteRequest(
        @NotBlank @Size(max = 150) String clientName,
        @Size(max = 200) String companyOrRole,
        @NotBlank String quote,
        @Size(max = 1000) String profileImageUrl,
        UUID projectId,
        Boolean approved,
        Boolean demonstration,
        Integer displayOrder
) {
}
