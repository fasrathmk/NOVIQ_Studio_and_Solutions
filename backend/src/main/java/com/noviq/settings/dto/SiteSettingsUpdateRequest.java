package com.noviq.settings.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SiteSettingsUpdateRequest(
        @NotBlank @Size(max = 300) String heroHeading,
        @NotBlank @Size(max = 1000) String heroSupportingText,
        @NotBlank @Email @Size(max = 255) String primaryEmail,
        @Size(max = 50) String phone,
        @Size(max = 300) String location,
        @Size(max = 500) String instagramUrl,
        @Size(max = 500) String facebookUrl,
        @Size(max = 500) String linkedinUrl,
        @Size(max = 500) String behanceUrl,
        @Size(max = 500) String githubUrl,
        @NotBlank @Size(max = 1000) String footerDescription,
        @NotBlank @Size(max = 200) String defaultSeoTitle,
        @NotBlank @Size(max = 500) String defaultSeoDescription
) {
}
