package com.noviq.settings.mapper;

import com.noviq.settings.dto.SiteSettingsResponse;
import com.noviq.settings.entity.SiteSettings;
import org.springframework.stereotype.Component;

@Component
public class SiteSettingsMapper {

    public SiteSettingsResponse toResponse(SiteSettings settings) {
        return new SiteSettingsResponse(
                settings.getHeroHeading(),
                settings.getHeroSupportingText(),
                settings.getPrimaryEmail(),
                settings.getPhone(),
                settings.getLocation(),
                settings.getInstagramUrl(),
                settings.getFacebookUrl(),
                settings.getLinkedinUrl(),
                settings.getBehanceUrl(),
                settings.getGithubUrl(),
                settings.getFooterDescription(),
                settings.getDefaultSeoTitle(),
                settings.getDefaultSeoDescription(),
                settings.getUpdatedAt()
        );
    }
}
