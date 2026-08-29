package com.noviq.service.controller;

import com.noviq.service.dto.ServiceDetailResponse;
import com.noviq.service.dto.ServiceSummaryResponse;
import com.noviq.service.service.ServiceOfferingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/services")
public class PublicServiceController {

    private final ServiceOfferingService serviceOfferingService;

    public PublicServiceController(ServiceOfferingService serviceOfferingService) {
        this.serviceOfferingService = serviceOfferingService;
    }

    @GetMapping
    public List<ServiceSummaryResponse> list() {
        return serviceOfferingService.listPublic();
    }

    @GetMapping("/{slug}")
    public ServiceDetailResponse get(@PathVariable String slug) {
        return serviceOfferingService.getPublicBySlug(slug);
    }
}
