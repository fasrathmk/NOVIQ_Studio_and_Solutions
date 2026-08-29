package com.noviq.inquiry.dto;

import com.noviq.inquiry.entity.BudgetRange;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record InquiryCreateRequest(
        @NotBlank @Size(max = 150) String fullName,
        @NotBlank @Email @Size(max = 255) String email,
        @Size(max = 50) String phone,
        @Size(max = 200) String companyName,
        @NotBlank @Size(max = 100) String requiredService,
        @NotNull BudgetRange budgetRange,
        LocalDate expectedDeadline,
        @NotBlank @Size(min = 20, max = 5000) String projectDescription,
        @Size(max = 500) String referenceUrl,
        @AssertTrue(message = "Consent is required to submit an inquiry.") boolean consent
) {
}
