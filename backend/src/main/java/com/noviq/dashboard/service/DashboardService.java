package com.noviq.dashboard.service;

import com.noviq.dashboard.dto.DashboardStatsResponse;
import com.noviq.inquiry.entity.InquiryStatus;
import com.noviq.inquiry.mapper.InquiryMapper;
import com.noviq.inquiry.repository.InquiryRepository;
import com.noviq.project.entity.ProjectStatus;
import com.noviq.project.repository.ProjectRepository;
import com.noviq.service.repository.ServiceOfferingRepository;
import com.noviq.team.repository.TeamMemberRepository;
import com.noviq.testimonial.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final InquiryRepository inquiryRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;
    private final TestimonialRepository testimonialRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final InquiryMapper inquiryMapper;

    public DashboardService(
            ProjectRepository projectRepository,
            InquiryRepository inquiryRepository,
            ServiceOfferingRepository serviceOfferingRepository,
            TestimonialRepository testimonialRepository,
            TeamMemberRepository teamMemberRepository,
            InquiryMapper inquiryMapper
    ) {
        this.projectRepository = projectRepository;
        this.inquiryRepository = inquiryRepository;
        this.serviceOfferingRepository = serviceOfferingRepository;
        this.testimonialRepository = testimonialRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.inquiryMapper = inquiryMapper;
    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse stats() {
        return new DashboardStatsResponse(
                projectRepository.count(),
                projectRepository.countByStatus(ProjectStatus.PUBLISHED),
                projectRepository.countByStatus(ProjectStatus.DRAFT),
                inquiryRepository.count(),
                inquiryRepository.countByStatus(InquiryStatus.NEW),
                serviceOfferingRepository.count(),
                testimonialRepository.countByApprovedTrue(),
                teamMemberRepository.countByActiveTrue(),
                inquiryRepository.findTop8ByOrderByCreatedAtDesc().stream()
                        .map(inquiryMapper::toResponse)
                        .toList()
        );
    }
}
