package com.noviq.settings.controller;

import com.noviq.settings.dto.SiteSettingsResponse;
import com.noviq.settings.service.SiteSettingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/settings")
public class PublicSettingsController {

    private final SiteSettingsService siteSettingsService;

    public PublicSettingsController(SiteSettingsService siteSettingsService) {
        this.siteSettingsService = siteSettingsService;
    }

    @GetMapping
    public SiteSettingsResponse get() {
        return siteSettingsService.get();
    }
}
