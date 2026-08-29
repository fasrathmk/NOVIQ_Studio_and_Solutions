package com.noviq.inquiry.controller;

import com.noviq.common.dto.MessageResponse;
import com.noviq.inquiry.dto.InquiryCreateRequest;
import com.noviq.inquiry.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/inquiries")
public class PublicInquiryController {

    private final InquiryService inquiryService;

    public PublicInquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> create(@Valid @RequestBody InquiryCreateRequest request) {
        inquiryService.createPublic(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Thank you. Your project inquiry has been received."));
    }
}
