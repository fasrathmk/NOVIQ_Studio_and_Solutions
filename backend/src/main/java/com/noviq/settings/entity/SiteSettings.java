package com.noviq.settings.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.EntityListeners;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "site_settings")
@EntityListeners(AuditingEntityListener.class)
public class SiteSettings {

    @Id
    private UUID id;

    @Column(name = "hero_heading", nullable = false, length = 300)
    private String heroHeading;

    @Column(name = "hero_supporting_text", nullable = false, length = 1000)
    private String heroSupportingText;

    @Column(name = "primary_email", nullable = false, length = 255)
    private String primaryEmail;

    @Column(length = 50)
    private String phone;

    @Column(length = 300)
    private String location;

    @Column(name = "instagram_url", length = 500)
    private String instagramUrl;

    @Column(name = "facebook_url", length = 500)
    private String facebookUrl;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "behance_url", length = 500)
    private String behanceUrl;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "footer_description", nullable = false, length = 1000)
    private String footerDescription;

    @Column(name = "default_seo_title", nullable = false, length = 200)
    private String defaultSeoTitle;

    @Column(name = "default_seo_description", nullable = false, length = 500)
    private String defaultSeoDescription;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getHeroHeading() {
        return heroHeading;
    }

    public void setHeroHeading(String heroHeading) {
        this.heroHeading = heroHeading;
    }

    public String getHeroSupportingText() {
        return heroSupportingText;
    }

    public void setHeroSupportingText(String heroSupportingText) {
        this.heroSupportingText = heroSupportingText;
    }

    public String getPrimaryEmail() {
        return primaryEmail;
    }

    public void setPrimaryEmail(String primaryEmail) {
        this.primaryEmail = primaryEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getInstagramUrl() {
        return instagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        this.instagramUrl = instagramUrl;
    }

    public String getFacebookUrl() {
        return facebookUrl;
    }

    public void setFacebookUrl(String facebookUrl) {
        this.facebookUrl = facebookUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getBehanceUrl() {
        return behanceUrl;
    }

    public void setBehanceUrl(String behanceUrl) {
        this.behanceUrl = behanceUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getFooterDescription() {
        return footerDescription;
    }

    public void setFooterDescription(String footerDescription) {
        this.footerDescription = footerDescription;
    }

    public String getDefaultSeoTitle() {
        return defaultSeoTitle;
    }

    public void setDefaultSeoTitle(String defaultSeoTitle) {
        this.defaultSeoTitle = defaultSeoTitle;
    }

    public String getDefaultSeoDescription() {
        return defaultSeoDescription;
    }

    public void setDefaultSeoDescription(String defaultSeoDescription) {
        this.defaultSeoDescription = defaultSeoDescription;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
