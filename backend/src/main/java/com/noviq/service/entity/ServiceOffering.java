package com.noviq.service.entity;

import com.noviq.common.AuditedEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "services")
public class ServiceOffering extends AuditedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(name = "capability_group", nullable = false, length = 50)
    private CapabilityGroup capabilityGroup;

    @Column(name = "short_description", nullable = false, length = 500)
    private String shortDescription;

    @Column(name = "full_description", nullable = false, columnDefinition = "TEXT")
    private String fullDescription;

    @Column(name = "problems_solved", columnDefinition = "TEXT")
    private String problemsSolved;

    @Column(name = "contact_cta", length = 300)
    private String contactCta;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "is_protected", nullable = false)
    private boolean protectedService = false;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    @OrderBy("displayOrder ASC")
    private List<ServiceDeliverable> deliverables = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    @OrderBy("displayOrder ASC")
    private List<ServiceProcessStep> processSteps = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    @OrderBy("displayOrder ASC")
    private List<ServiceFaq> faqs = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public CapabilityGroup getCapabilityGroup() {
        return capabilityGroup;
    }

    public void setCapabilityGroup(CapabilityGroup capabilityGroup) {
        this.capabilityGroup = capabilityGroup;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public String getProblemsSolved() {
        return problemsSolved;
    }

    public void setProblemsSolved(String problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public String getContactCta() {
        return contactCta;
    }

    public void setContactCta(String contactCta) {
        this.contactCta = contactCta;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isProtectedService() {
        return protectedService;
    }

    public void setProtectedService(boolean protectedService) {
        this.protectedService = protectedService;
    }

    public List<ServiceDeliverable> getDeliverables() {
        return deliverables;
    }

    public List<ServiceProcessStep> getProcessSteps() {
        return processSteps;
    }

    public List<ServiceFaq> getFaqs() {
        return faqs;
    }
}
