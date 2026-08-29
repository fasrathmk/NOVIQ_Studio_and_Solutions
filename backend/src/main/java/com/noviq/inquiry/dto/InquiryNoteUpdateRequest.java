package com.noviq.inquiry.dto;

import jakarta.validation.constraints.Size;

public record InquiryNoteUpdateRequest(@Size(max = 4000) String internalNote) {
}
