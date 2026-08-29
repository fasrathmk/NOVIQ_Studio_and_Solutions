package com.noviq.inquiry.mapper;

import com.noviq.inquiry.dto.InquiryResponse;
import com.noviq.inquiry.entity.Inquiry;
import org.springframework.stereotype.Component;

@Component
public class InquiryMapper {

    public InquiryResponse toResponse(Inquiry inquiry) {
        return new InquiryResponse(
                inquiry.getId().toString(),
                inquiry.getFullName(),
                inquiry.getEmail(),
                inquiry.getPhone(),
                inquiry.getCompanyName(),
                inquiry.getRequiredService(),
                inquiry.getBudgetRange(),
                inquiry.getExpectedDeadline(),
                inquiry.getProjectDescription(),
                inquiry.getReferenceUrl(),
                inquiry.isConsent(),
                inquiry.getStatus(),
                inquiry.getInternalNote(),
                inquiry.getCreatedAt(),
                inquiry.getUpdatedAt()
        );
    }
}
