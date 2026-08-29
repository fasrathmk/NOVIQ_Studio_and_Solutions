package com.noviq.testimonial.repository;

import com.noviq.testimonial.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TestimonialRepository extends JpaRepository<Testimonial, UUID> {

    List<Testimonial> findAllByApprovedTrueOrderByDisplayOrderAscCreatedAtDesc();

    List<Testimonial> findAllByOrderByDisplayOrderAscCreatedAtDesc();

    long countByApprovedTrue();

    @Query("SELECT t FROM Testimonial t LEFT JOIN FETCH t.project WHERE t.id = :id")
    Optional<Testimonial> findWithProjectById(UUID id);
}
