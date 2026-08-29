package com.noviq.service.dto;

import com.noviq.project.dto.RelatedProjectResponse;
import com.noviq.service.entity.CapabilityGroup;

import java.util.List;

public record ServiceDetailResponse(
        String id,
        String title,
        String slug,
        CapabilityGroup capabilityGroup,
        String shortDescription,
        String fullDescription,
        String problemsSolved,
        String contactCta,
        boolean active,
        int displayOrder,
        boolean protectedService,
        List<DeliverableResponse> deliverables,
        List<ProcessStepResponse> processSteps,
        List<FaqResponse> faqs,
        List<RelatedProjectResponse> relatedProjects
) {
}
