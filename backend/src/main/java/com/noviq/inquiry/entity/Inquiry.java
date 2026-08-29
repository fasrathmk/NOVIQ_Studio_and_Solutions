package com.noviq.inquiry.entity;

import com.noviq.common.AuditedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "inquiries")
public class Inquiry extends AuditedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(name = "company_name", length = 200)
    private String companyName;

    @Column(name = "required_service", nullable = false, length = 100)
    private String requiredService;

    @Enumerated(EnumType.STRING)
    @Column(name = "budget_range", nullable = false, length = 50)
    private BudgetRange budgetRange;

    @Column(name = "expected_deadline")
    private LocalDate expectedDeadline;

    @Column(name = "project_description", nullable = false, columnDefinition = "TEXT")
    private String projectDescription;

    @Column(name = "reference_url", length = 500)
    private String referenceUrl;

    @Column(nullable = false)
    private boolean consent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private InquiryStatus status = InquiryStatus.NEW;

    @Column(name = "internal_note", columnDefinition = "TEXT")
    private String internalNote;

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRequiredService() {
        return requiredService;
    }

    public void setRequiredService(String requiredService) {
        this.requiredService = requiredService;
    }

    public BudgetRange getBudgetRange() {
        return budgetRange;
    }

    public void setBudgetRange(BudgetRange budgetRange) {
        this.budgetRange = budgetRange;
    }

    public LocalDate getExpectedDeadline() {
        return expectedDeadline;
    }

    public void setExpectedDeadline(LocalDate expectedDeadline) {
        this.expectedDeadline = expectedDeadline;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public String getReferenceUrl() {
        return referenceUrl;
    }

    public void setReferenceUrl(String referenceUrl) {
        this.referenceUrl = referenceUrl;
    }

    public boolean isConsent() {
        return consent;
    }

    public void setConsent(boolean consent) {
        this.consent = consent;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public String getInternalNote() {
        return internalNote;
    }

    public void setInternalNote(String internalNote) {
        this.internalNote = internalNote;
    }
}
