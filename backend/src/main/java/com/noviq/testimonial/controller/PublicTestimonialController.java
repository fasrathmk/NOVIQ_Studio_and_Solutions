package com.noviq.testimonial.controller;

import com.noviq.testimonial.dto.TestimonialResponse;
import com.noviq.testimonial.service.TestimonialService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/testimonials")
public class PublicTestimonialController {

    private final TestimonialService testimonialService;

    public PublicTestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public List<TestimonialResponse> list() {
        return testimonialService.listPublic();
    }
}
