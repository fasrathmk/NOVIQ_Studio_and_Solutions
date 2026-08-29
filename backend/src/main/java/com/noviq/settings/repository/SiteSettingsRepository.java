package com.noviq.settings.repository;

import com.noviq.settings.entity.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, UUID> {
}
