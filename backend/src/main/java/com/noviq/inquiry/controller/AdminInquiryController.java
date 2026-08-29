package com.noviq.inquiry.controller;

import com.noviq.common.dto.PageResponse;
import com.noviq.inquiry.dto.InquiryNoteUpdateRequest;
import com.noviq.inquiry.dto.InquiryResponse;
import com.noviq.inquiry.dto.InquiryStatusUpdateRequest;
import com.noviq.inquiry.entity.InquiryStatus;
import com.noviq.inquiry.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/inquiries")
public class AdminInquiryController {

    private final InquiryService inquiryService;

    public AdminInquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @GetMapping
    public PageResponse<InquiryResponse> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String service,
            @RequestParam(required = false) InquiryStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return inquiryService.listAdmin(search, service, status, page, size);
    }

    @GetMapping("/{id}")
    public InquiryResponse get(@PathVariable UUID id) {
        return inquiryService.getAdmin(id);
    }

    @PatchMapping("/{id}/status")
    public InquiryResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody InquiryStatusUpdateRequest request
    ) {
        return inquiryService.updateStatus(id, request);
    }

    @PatchMapping("/{id}/note")
    public InquiryResponse updateNote(
            @PathVariable UUID id,
            @Valid @RequestBody InquiryNoteUpdateRequest request
    ) {
        return inquiryService.updateNote(id, request);
    }

    @PostMapping("/{id}/archive")
    public InquiryResponse archive(@PathVariable UUID id) {
        return inquiryService.archive(id);
    }

    @PostMapping("/{id}/spam")
    public InquiryResponse spam(@PathVariable UUID id) {
        return inquiryService.markSpam(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        inquiryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
