package com.noviq.settings.controller;

import com.noviq.settings.dto.SiteSettingsResponse;
import com.noviq.settings.dto.SiteSettingsUpdateRequest;
import com.noviq.settings.service.SiteSettingsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/settings")
public class AdminSettingsController {

    private final SiteSettingsService siteSettingsService;

    public AdminSettingsController(SiteSettingsService siteSettingsService) {
        this.siteSettingsService = siteSettingsService;
    }

    @GetMapping
    public SiteSettingsResponse get() {
        return siteSettingsService.get();
    }

    @PutMapping
    public SiteSettingsResponse update(@Valid @RequestBody SiteSettingsUpdateRequest request) {
        return siteSettingsService.update(request);
    }
}
