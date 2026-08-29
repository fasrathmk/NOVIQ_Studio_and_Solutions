package com.noviq.service.controller;

import com.noviq.common.dto.ActiveUpdateRequest;
import com.noviq.common.dto.IdOrderRequest;
import com.noviq.service.dto.ServiceDetailResponse;
import com.noviq.service.dto.ServiceSummaryResponse;
import com.noviq.service.dto.ServiceWriteRequest;
import com.noviq.service.service.ServiceOfferingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/services")
public class AdminServiceController {

    private final ServiceOfferingService serviceOfferingService;

    public AdminServiceController(ServiceOfferingService serviceOfferingService) {
        this.serviceOfferingService = serviceOfferingService;
    }

    @GetMapping
    public List<ServiceSummaryResponse> list() {
        return serviceOfferingService.listAdmin();
    }

    @GetMapping("/{id}")
    public ServiceDetailResponse get(@PathVariable UUID id) {
        return serviceOfferingService.getAdmin(id);
    }

    @PostMapping
    public ResponseEntity<ServiceDetailResponse> create(@Valid @RequestBody ServiceWriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceOfferingService.create(request));
    }

    @PutMapping("/{id}")
    public ServiceDetailResponse update(@PathVariable UUID id, @Valid @RequestBody ServiceWriteRequest request) {
        return serviceOfferingService.update(id, request);
    }

    @PatchMapping("/{id}/active")
    public ServiceDetailResponse setActive(@PathVariable UUID id, @Valid @RequestBody ActiveUpdateRequest request) {
        return serviceOfferingService.setActive(id, request.active());
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorder(@Valid @RequestBody IdOrderRequest request) {
        serviceOfferingService.reorder(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        serviceOfferingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
