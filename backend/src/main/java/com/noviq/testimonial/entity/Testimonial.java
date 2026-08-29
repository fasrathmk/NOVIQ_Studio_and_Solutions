package com.noviq.testimonial.entity;

import com.noviq.common.AuditedEntity;
import com.noviq.project.entity.Project;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "testimonials")
public class Testimonial extends AuditedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "client_name", nullable = false, length = 150)
    private String clientName;

    @Column(name = "company_or_role", length = 200)
    private String companyOrRole;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String quote;

    @Column(name = "profile_image_url", length = 1000)
    private String profileImageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(nullable = false)
    private boolean approved = false;

    @Column(nullable = false)
    private boolean demonstration = false;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    public UUID getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getCompanyOrRole() {
        return companyOrRole;
    }

    public void setCompanyOrRole(String companyOrRole) {
        this.companyOrRole = companyOrRole;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public boolean isDemonstration() {
        return demonstration;
    }

    public void setDemonstration(boolean demonstration) {
        this.demonstration = demonstration;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }
}
