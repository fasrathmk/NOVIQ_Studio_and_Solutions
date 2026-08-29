package com.noviq.service.mapper;

import com.noviq.project.dto.RelatedProjectResponse;
import com.noviq.project.entity.Project;
import com.noviq.service.dto.DeliverableResponse;
import com.noviq.service.dto.FaqResponse;
import com.noviq.service.dto.ProcessStepResponse;
import com.noviq.service.dto.ServiceDetailResponse;
import com.noviq.service.dto.ServiceSummaryResponse;
import com.noviq.service.entity.ServiceDeliverable;
import com.noviq.service.entity.ServiceFaq;
import com.noviq.service.entity.ServiceOffering;
import com.noviq.service.entity.ServiceProcessStep;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ServiceOfferingMapper {

    public ServiceSummaryResponse toSummary(ServiceOffering service) {
        return new ServiceSummaryResponse(
                service.getId().toString(),
                service.getTitle(),
                service.getSlug(),
                service.getCapabilityGroup(),
                service.getShortDescription(),
                service.getContactCta(),
                service.isActive(),
                service.getDisplayOrder(),
                service.isProtectedService()
        );
    }

    public ServiceDetailResponse toDetail(ServiceOffering service, List<Project> relatedProjects) {
        return new ServiceDetailResponse(
                service.getId().toString(),
                service.getTitle(),
                service.getSlug(),
                service.getCapabilityGroup(),
                service.getShortDescription(),
                service.getFullDescription(),
                service.getProblemsSolved(),
                service.getContactCta(),
                service.isActive(),
                service.getDisplayOrder(),
                service.isProtectedService(),
                service.getDeliverables().stream().map(this::toDeliverable).toList(),
                service.getProcessSteps().stream().map(this::toStep).toList(),
                service.getFaqs().stream().map(this::toFaq).toList(),
                relatedProjects.stream().map(this::toRelated).toList()
        );
    }

    public DeliverableResponse toDeliverable(ServiceDeliverable deliverable) {
        return new DeliverableResponse(
                deliverable.getId() == null ? null : deliverable.getId().toString(),
                deliverable.getTitle(),
                deliverable.getDescription(),
                deliverable.getDisplayOrder()
        );
    }

    public ProcessStepResponse toStep(ServiceProcessStep step) {
        return new ProcessStepResponse(
                step.getId() == null ? null : step.getId().toString(),
                step.getTitle(),
                step.getDescription(),
                step.getDisplayOrder()
        );
    }

    public FaqResponse toFaq(ServiceFaq faq) {
        return new FaqResponse(
                faq.getId() == null ? null : faq.getId().toString(),
                faq.getQuestion(),
                faq.getAnswer(),
                faq.getDisplayOrder()
        );
    }

    private RelatedProjectResponse toRelated(Project project) {
        return new RelatedProjectResponse(
                project.getTitle(),
                project.getSlug(),
                project.getCategory().name(),
                project.getShortDescription(),
                project.getCoverImageUrl(),
                project.getCoverImageAlt()
        );
    }
}
