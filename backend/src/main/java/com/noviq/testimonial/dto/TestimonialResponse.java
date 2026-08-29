package com.noviq.testimonial.dto;

public record TestimonialResponse(
        String id,
        String clientName,
        String companyOrRole,
        String quote,
        String profileImageUrl,
        String projectId,
        String projectTitle,
        boolean approved,
        boolean demonstration,
        int displayOrder
) {
}
