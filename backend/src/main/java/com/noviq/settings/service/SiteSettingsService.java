package com.noviq.settings.service;

import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.settings.dto.SiteSettingsResponse;
import com.noviq.settings.dto.SiteSettingsUpdateRequest;
import com.noviq.settings.entity.SiteSettings;
import com.noviq.settings.mapper.SiteSettingsMapper;
import com.noviq.settings.repository.SiteSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SiteSettingsService {

    private final SiteSettingsRepository siteSettingsRepository;
    private final SiteSettingsMapper mapper;

    public SiteSettingsService(SiteSettingsRepository siteSettingsRepository, SiteSettingsMapper mapper) {
        this.siteSettingsRepository = siteSettingsRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public SiteSettingsResponse get() {
        return mapper.toResponse(current());
    }

    @Transactional
    public SiteSettingsResponse update(SiteSettingsUpdateRequest request) {
        SiteSettings settings = current();
        settings.setHeroHeading(request.heroHeading().trim());
        settings.setHeroSupportingText(request.heroSupportingText().trim());
        settings.setPrimaryEmail(request.primaryEmail().trim().toLowerCase());
        settings.setPhone(trimToNull(request.phone()));
        settings.setLocation(trimToNull(request.location()));
        settings.setInstagramUrl(trimToNull(request.instagramUrl()));
        settings.setFacebookUrl(trimToNull(request.facebookUrl()));
        settings.setLinkedinUrl(trimToNull(request.linkedinUrl()));
        settings.setBehanceUrl(trimToNull(request.behanceUrl()));
        settings.setGithubUrl(trimToNull(request.githubUrl()));
        settings.setFooterDescription(request.footerDescription().trim());
        settings.setDefaultSeoTitle(request.defaultSeoTitle().trim());
        settings.setDefaultSeoDescription(request.defaultSeoDescription().trim());
        return mapper.toResponse(settings);
    }

    private SiteSettings current() {
        return siteSettingsRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Website settings have not been initialized."));
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
