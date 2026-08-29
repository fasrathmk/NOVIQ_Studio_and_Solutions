package com.noviq.service.service;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.common.exception.BadRequestException;
import com.noviq.common.exception.ConflictException;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.common.util.SlugUtil;
import com.noviq.project.entity.Project;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.repository.ProjectRepository;
import com.noviq.service.dto.DeliverableWriteRequest;
import com.noviq.service.dto.FaqWriteRequest;
import com.noviq.service.dto.ProcessStepWriteRequest;
import com.noviq.service.dto.ServiceDetailResponse;
import com.noviq.service.dto.ServiceSummaryResponse;
import com.noviq.service.dto.ServiceWriteRequest;
import com.noviq.service.entity.CapabilityGroup;
import com.noviq.service.entity.ServiceDeliverable;
import com.noviq.service.entity.ServiceFaq;
import com.noviq.service.entity.ServiceOffering;
import com.noviq.service.entity.ServiceProcessStep;
import com.noviq.service.mapper.ServiceOfferingMapper;
import com.noviq.service.repository.ServiceOfferingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;
    private final ProjectRepository projectRepository;
    private final ServiceOfferingMapper mapper;

    public ServiceOfferingService(
            ServiceOfferingRepository serviceOfferingRepository,
            ProjectRepository projectRepository,
            ServiceOfferingMapper mapper
    ) {
        this.serviceOfferingRepository = serviceOfferingRepository;
        this.projectRepository = projectRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<ServiceSummaryResponse> listPublic() {
        return serviceOfferingRepository.findAllByActiveTrueOrderByDisplayOrderAsc().stream()
                .map(mapper::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public ServiceDetailResponse getPublicBySlug(String slug) {
        ServiceOffering service = serviceOfferingRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found."));
        initializeCollections(service);
        return mapper.toDetail(service, relatedProjects(service));
    }

    @Transactional(readOnly = true)
    public List<ServiceSummaryResponse> listAdmin() {
        return serviceOfferingRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(mapper::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public ServiceDetailResponse getAdmin(UUID id) {
        ServiceOffering service = findById(id);
        initializeCollections(service);
        return mapper.toDetail(service, relatedProjects(service));
    }

    @Transactional
    public ServiceDetailResponse create(ServiceWriteRequest request) {
        String slug = resolveSlug(request.slug(), request.title(), null);
        ServiceOffering service = new ServiceOffering();
        apply(service, request, slug);
        ServiceOffering saved = serviceOfferingRepository.save(service);
        initializeCollections(saved);
        return mapper.toDetail(saved, relatedProjects(saved));
    }

    @Transactional
    public ServiceDetailResponse update(UUID id, ServiceWriteRequest request) {
        ServiceOffering service = findById(id);
        String slug = resolveSlug(request.slug(), request.title(), id);
        apply(service, request, slug);
        initializeCollections(service);
        return mapper.toDetail(service, relatedProjects(service));
    }

    @Transactional
    public ServiceDetailResponse setActive(UUID id, boolean active) {
        ServiceOffering service = findById(id);
        service.setActive(active);
        initializeCollections(service);
        return mapper.toDetail(service, relatedProjects(service));
    }

    @Transactional
    public void reorder(IdOrderRequest request) {
        List<ServiceOffering> services = serviceOfferingRepository.findAllById(request.ids());
        if (services.size() != request.ids().size()) {
            throw new BadRequestException("One or more services could not be found.");
        }
        for (int index = 0; index < request.ids().size(); index++) {
            UUID id = request.ids().get(index);
            int order = index + 1;
            services.stream()
                    .filter(service -> service.getId().equals(id))
                    .findFirst()
                    .ifPresent(service -> service.setDisplayOrder(order));
        }
    }

    @Transactional
    public void delete(UUID id) {
        ServiceOffering service = findById(id);
        if (service.isProtectedService()) {
            throw new ConflictException("Protected services cannot be deleted. They can be updated or deactivated.");
        }
        serviceOfferingRepository.delete(service);
    }

    private void apply(ServiceOffering service, ServiceWriteRequest request, String slug) {
        service.setTitle(request.title().trim());
        service.setSlug(slug);
        service.setCapabilityGroup(request.capabilityGroup());
        service.setShortDescription(request.shortDescription().trim());
        service.setFullDescription(request.fullDescription().trim());
        service.setProblemsSolved(trimToNull(request.problemsSolved()));
        service.setContactCta(trimToNull(request.contactCta()));
        service.setActive(request.active() == null || request.active());
        service.setDisplayOrder(request.displayOrder());

        service.getDeliverables().clear();
        if (request.deliverables() != null) {
            for (DeliverableWriteRequest item : request.deliverables()) {
                ServiceDeliverable deliverable = new ServiceDeliverable();
                deliverable.setTitle(item.title().trim());
                deliverable.setDescription(trimToNull(item.description()));
                deliverable.setDisplayOrder(item.displayOrder());
                service.getDeliverables().add(deliverable);
            }
        }

        service.getProcessSteps().clear();
        if (request.processSteps() != null) {
            for (ProcessStepWriteRequest item : request.processSteps()) {
                ServiceProcessStep step = new ServiceProcessStep();
                step.setTitle(item.title().trim());
                step.setDescription(trimToNull(item.description()));
                step.setDisplayOrder(item.displayOrder());
                service.getProcessSteps().add(step);
            }
        }

        service.getFaqs().clear();
        if (request.faqs() != null) {
            for (FaqWriteRequest item : request.faqs()) {
                ServiceFaq faq = new ServiceFaq();
                faq.setQuestion(item.question().trim());
                faq.setAnswer(item.answer().trim());
                faq.setDisplayOrder(item.displayOrder());
                service.getFaqs().add(faq);
            }
        }
    }

    private String resolveSlug(String requested, String title, UUID currentId) {
        String slug = SlugUtil.slugify(requested == null || requested.isBlank() ? title : requested);
        boolean taken = currentId == null
                ? serviceOfferingRepository.existsBySlug(slug)
                : serviceOfferingRepository.existsBySlugAndIdNot(slug, currentId);
        if (taken) {
            throw new ConflictException("A service with this slug already exists.");
        }
        return slug;
    }

    private List<Project> relatedProjects(ServiceOffering service) {
        ProjectCategory category = categoryFor(service.getSlug(), service.getCapabilityGroup());
        return projectRepository.findRelatedPublished(category, service.getSlug()).stream().limit(3).toList();
    }

    private ProjectCategory categoryFor(String slug, CapabilityGroup group) {
        return switch (slug) {
            case "logo-design-brand-identity" -> ProjectCategory.BRANDING;
            case "ui-ux-design" -> ProjectCategory.UI_UX;
            case "web-application-development" -> ProjectCategory.DEVELOPMENT;
            case "business-automation" -> ProjectCategory.AUTOMATION;
            case "business-analysis" -> ProjectCategory.BUSINESS_ANALYSIS;
            case "3d-landscape-design" -> ProjectCategory.LANDSCAPE;
            default -> switch (group) {
                case DESIGN -> ProjectCategory.BRANDING;
                case TECHNOLOGY -> ProjectCategory.DEVELOPMENT;
                case VISUALIZATION -> ProjectCategory.LANDSCAPE;
            };
        };
    }

    private ServiceOffering findById(UUID id) {
        return serviceOfferingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found."));
    }

    private void initializeCollections(ServiceOffering service) {
        service.getDeliverables().size();
        service.getProcessSteps().size();
        service.getFaqs().size();
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
