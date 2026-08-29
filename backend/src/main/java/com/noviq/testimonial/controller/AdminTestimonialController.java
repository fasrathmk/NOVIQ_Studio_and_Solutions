package com.noviq.testimonial.controller;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.testimonial.dto.ApprovalUpdateRequest;
import com.noviq.testimonial.dto.TestimonialResponse;
import com.noviq.testimonial.dto.TestimonialWriteRequest;
import com.noviq.testimonial.service.TestimonialService;
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
@RequestMapping("/api/v1/admin/testimonials")
public class AdminTestimonialController {

    private final TestimonialService testimonialService;

    public AdminTestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public List<TestimonialResponse> list() {
        return testimonialService.listAdmin();
    }

    @GetMapping("/{id}")
    public TestimonialResponse get(@PathVariable UUID id) {
        return testimonialService.getAdmin(id);
    }

    @PostMapping
    public ResponseEntity<TestimonialResponse> create(@Valid @RequestBody TestimonialWriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialService.create(request));
    }

    @PutMapping("/{id}")
    public TestimonialResponse update(@PathVariable UUID id, @Valid @RequestBody TestimonialWriteRequest request) {
        return testimonialService.update(id, request);
    }

    @PatchMapping("/{id}/approval")
    public TestimonialResponse setApproved(@PathVariable UUID id, @Valid @RequestBody ApprovalUpdateRequest request) {
        return testimonialService.setApproved(id, request.approved());
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorder(@Valid @RequestBody IdOrderRequest request) {
        testimonialService.reorder(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        testimonialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
