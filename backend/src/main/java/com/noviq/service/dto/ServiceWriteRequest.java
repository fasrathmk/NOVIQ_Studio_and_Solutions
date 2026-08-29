package com.noviq.service.dto;

import com.noviq.service.entity.CapabilityGroup;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ServiceWriteRequest(
        @NotBlank @Size(max = 200) String title,
        @Size(max = 200) String slug,
        @NotNull CapabilityGroup capabilityGroup,
        @NotBlank @Size(max = 500) String shortDescription,
        @NotBlank String fullDescription,
        String problemsSolved,
        @Size(max = 300) String contactCta,
        Boolean active,
        @NotNull Integer displayOrder,
        @Valid List<DeliverableWriteRequest> deliverables,
        @Valid List<ProcessStepWriteRequest> processSteps,
        @Valid List<FaqWriteRequest> faqs
) {
}
