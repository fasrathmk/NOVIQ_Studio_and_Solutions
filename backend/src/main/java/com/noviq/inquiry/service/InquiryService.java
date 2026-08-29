package com.noviq.inquiry.service;

import com.noviq.common.dto.PageResponse;
import com.noviq.common.exception.BadRequestException;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.inquiry.dto.InquiryCreateRequest;
import com.noviq.inquiry.dto.InquiryNoteUpdateRequest;
import com.noviq.inquiry.dto.InquiryResponse;
import com.noviq.inquiry.dto.InquiryStatusUpdateRequest;
import com.noviq.inquiry.entity.Inquiry;
import com.noviq.inquiry.entity.InquiryStatus;
import com.noviq.inquiry.mapper.InquiryMapper;
import com.noviq.inquiry.repository.InquiryRepository;
import com.noviq.service.repository.ServiceOfferingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class InquiryService {

    private static final Set<String> ALLOWED_SERVICES = Set.of(
            "logo-design-brand-identity",
            "ui-ux-design",
            "web-application-development",
            "business-automation",
            "business-analysis",
            "3d-landscape-design"
    );

    private final InquiryRepository inquiryRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;
    private final InquiryMapper mapper;

    public InquiryService(
            InquiryRepository inquiryRepository,
            ServiceOfferingRepository serviceOfferingRepository,
            InquiryMapper mapper
    ) {
        this.inquiryRepository = inquiryRepository;
        this.serviceOfferingRepository = serviceOfferingRepository;
        this.mapper = mapper;
    }

    @Transactional
    public InquiryResponse createPublic(InquiryCreateRequest request) {
        if (!request.consent()) {
            throw new BadRequestException("Consent is required to submit an inquiry.");
        }
        if (!ALLOWED_SERVICES.contains(request.requiredService())) {
            throw new BadRequestException("Please choose a valid service.");
        }
        if (serviceOfferingRepository.findBySlugAndActiveTrue(request.requiredService()).isEmpty()) {
            throw new BadRequestException("The selected service is not currently available.");
        }

        Inquiry inquiry = new Inquiry();
        inquiry.setFullName(request.fullName().trim());
        inquiry.setEmail(request.email().trim().toLowerCase());
        inquiry.setPhone(trimToNull(request.phone()));
        inquiry.setCompanyName(trimToNull(request.companyName()));
        inquiry.setRequiredService(request.requiredService());
        inquiry.setBudgetRange(request.budgetRange());
        inquiry.setExpectedDeadline(request.expectedDeadline());
        inquiry.setProjectDescription(request.projectDescription().trim());
        inquiry.setReferenceUrl(trimToNull(request.referenceUrl()));
        inquiry.setConsent(true);
        inquiry.setStatus(InquiryStatus.NEW);
        return mapper.toResponse(inquiryRepository.save(inquiry));
    }

    @Transactional(readOnly = true)
    public PageResponse<InquiryResponse> listAdmin(String search, String service, InquiryStatus status, int page, int size) {
        String query = search == null || search.isBlank() ? null : search.trim();
        String serviceFilter = service == null || service.isBlank() ? null : service.trim();
        Page<Inquiry> result = inquiryRepository.search(
                query,
                serviceFilter,
                status,
                PageRequest.of(page, Math.min(size, 50), Sort.by("createdAt").descending())
        );
        return PageResponse.from(result.map(mapper::toResponse));
    }

    @Transactional(readOnly = true)
    public InquiryResponse getAdmin(UUID id) {
        return mapper.toResponse(findById(id));
    }

    @Transactional
    public InquiryResponse updateStatus(UUID id, InquiryStatusUpdateRequest request) {
        Inquiry inquiry = findById(id);
        inquiry.setStatus(request.status());
        return mapper.toResponse(inquiry);
    }

    @Transactional
    public InquiryResponse updateNote(UUID id, InquiryNoteUpdateRequest request) {
        Inquiry inquiry = findById(id);
        inquiry.setInternalNote(trimToNull(request.internalNote()));
        return mapper.toResponse(inquiry);
    }

    @Transactional
    public InquiryResponse archive(UUID id) {
        Inquiry inquiry = findById(id);
        inquiry.setStatus(InquiryStatus.ARCHIVED);
        return mapper.toResponse(inquiry);
    }

    @Transactional
    public InquiryResponse markSpam(UUID id) {
        Inquiry inquiry = findById(id);
        inquiry.setStatus(InquiryStatus.SPAM);
        return mapper.toResponse(inquiry);
    }

    @Transactional
    public void delete(UUID id) {
        inquiryRepository.delete(findById(id));
    }

    private Inquiry findById(UUID id) {
        return inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found."));
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
