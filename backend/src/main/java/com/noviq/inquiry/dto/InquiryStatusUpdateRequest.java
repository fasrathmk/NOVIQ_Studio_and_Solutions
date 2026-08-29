package com.noviq.inquiry.dto;

import com.noviq.inquiry.entity.InquiryStatus;
import jakarta.validation.constraints.NotNull;

public record InquiryStatusUpdateRequest(@NotNull InquiryStatus status) {
}
