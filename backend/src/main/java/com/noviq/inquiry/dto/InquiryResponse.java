package com.noviq.inquiry.dto;

import com.noviq.inquiry.entity.BudgetRange;
import com.noviq.inquiry.entity.InquiryStatus;

import java.time.Instant;
import java.time.LocalDate;

public record InquiryResponse(
        String id,
        String fullName,
        String email,
        String phone,
        String companyName,
        String requiredService,
        BudgetRange budgetRange,
        LocalDate expectedDeadline,
        String projectDescription,
        String referenceUrl,
        boolean consent,
        InquiryStatus status,
        String internalNote,
        Instant createdAt,
        Instant updatedAt
) {
}
