package com.noviq.service.dto;

import com.noviq.service.entity.CapabilityGroup;

public record ServiceSummaryResponse(
        String id,
        String title,
        String slug,
        CapabilityGroup capabilityGroup,
        String shortDescription,
        String contactCta,
        boolean active,
        int displayOrder,
        boolean protectedService
) {
}
