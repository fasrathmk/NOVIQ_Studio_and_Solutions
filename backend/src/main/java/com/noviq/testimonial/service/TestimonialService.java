package com.noviq.testimonial.service;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.project.entity.Project;
import com.noviq.project.repository.ProjectRepository;
import com.noviq.testimonial.dto.TestimonialResponse;
import com.noviq.testimonial.dto.TestimonialWriteRequest;
import com.noviq.testimonial.entity.Testimonial;
import com.noviq.testimonial.mapper.TestimonialMapper;
import com.noviq.testimonial.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final ProjectRepository projectRepository;
    private final TestimonialMapper mapper;

    public TestimonialService(
            TestimonialRepository testimonialRepository,
            ProjectRepository projectRepository,
            TestimonialMapper mapper
    ) {
        this.testimonialRepository = testimonialRepository;
        this.projectRepository = projectRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<TestimonialResponse> listPublic() {
        return testimonialRepository.findAllByApprovedTrueOrderByDisplayOrderAscCreatedAtDesc().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TestimonialResponse> listAdmin() {
        return testimonialRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TestimonialResponse getAdmin(UUID id) {
        return mapper.toResponse(findWithProject(id));
    }

    @Transactional
    public TestimonialResponse create(TestimonialWriteRequest request) {
        Testimonial testimonial = new Testimonial();
        apply(testimonial, request);
        return mapper.toResponse(testimonialRepository.save(testimonial));
    }

    @Transactional
    public TestimonialResponse update(UUID id, TestimonialWriteRequest request) {
        Testimonial testimonial = findWithProject(id);
        apply(testimonial, request);
        return mapper.toResponse(testimonial);
    }

    @Transactional
    public TestimonialResponse setApproved(UUID id, boolean approved) {
        Testimonial testimonial = findWithProject(id);
        testimonial.setApproved(approved);
        return mapper.toResponse(testimonial);
    }

    @Transactional
    public void reorder(IdOrderRequest request) {
        List<Testimonial> items = testimonialRepository.findAllById(request.ids());
        for (int index = 0; index < request.ids().size(); index++) {
            UUID id = request.ids().get(index);
            int order = index + 1;
            items.stream()
                    .filter(item -> item.getId().equals(id))
                    .findFirst()
                    .ifPresent(item -> item.setDisplayOrder(order));
        }
    }

    @Transactional
    public void delete(UUID id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found."));
        testimonialRepository.delete(testimonial);
    }

    private void apply(Testimonial testimonial, TestimonialWriteRequest request) {
        testimonial.setClientName(request.clientName().trim());
        testimonial.setCompanyOrRole(trimToNull(request.companyOrRole()));
        testimonial.setQuote(request.quote().trim());
        testimonial.setProfileImageUrl(trimToNull(request.profileImageUrl()));
        testimonial.setApproved(Boolean.TRUE.equals(request.approved()));
        testimonial.setDemonstration(Boolean.TRUE.equals(request.demonstration()));
        testimonial.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
        if (request.projectId() == null) {
            testimonial.setProject(null);
        } else {
            Project project = projectRepository.findById(request.projectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Related project not found."));
            testimonial.setProject(project);
        }
    }

    private Testimonial findWithProject(UUID id) {
        return testimonialRepository.findWithProjectById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found."));
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
