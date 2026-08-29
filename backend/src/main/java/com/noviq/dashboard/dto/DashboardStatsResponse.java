package com.noviq.dashboard.dto;

import com.noviq.inquiry.dto.InquiryResponse;

import java.util.List;

public record DashboardStatsResponse(
        long totalProjects,
        long publishedProjects,
        long draftProjects,
        long totalInquiries,
        long newInquiries,
        long totalServices,
        long approvedTestimonials,
        long activeTeamMembers,
        List<InquiryResponse> recentInquiries
) {
}
