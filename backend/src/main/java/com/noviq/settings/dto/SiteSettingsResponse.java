package com.noviq.settings.dto;

import java.time.Instant;

public record SiteSettingsResponse(
        String heroHeading,
        String heroSupportingText,
        String primaryEmail,
        String phone,
        String location,
        String instagramUrl,
        String facebookUrl,
        String linkedinUrl,
        String behanceUrl,
        String githubUrl,
        String footerDescription,
        String defaultSeoTitle,
        String defaultSeoDescription,
        Instant updatedAt
) {
}
