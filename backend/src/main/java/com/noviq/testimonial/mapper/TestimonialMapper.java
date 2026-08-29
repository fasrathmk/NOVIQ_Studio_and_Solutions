package com.noviq.testimonial.mapper;

import com.noviq.testimonial.dto.TestimonialResponse;
import com.noviq.testimonial.entity.Testimonial;
import org.springframework.stereotype.Component;

@Component
public class TestimonialMapper {

    public TestimonialResponse toResponse(Testimonial testimonial) {
        return new TestimonialResponse(
                testimonial.getId().toString(),
                testimonial.getClientName(),
                testimonial.getCompanyOrRole(),
                testimonial.getQuote(),
                testimonial.getProfileImageUrl(),
                testimonial.getProject() == null ? null : testimonial.getProject().getId().toString(),
                testimonial.getProject() == null ? null : testimonial.getProject().getTitle(),
                testimonial.isApproved(),
                testimonial.isDemonstration(),
                testimonial.getDisplayOrder()
        );
    }
}
