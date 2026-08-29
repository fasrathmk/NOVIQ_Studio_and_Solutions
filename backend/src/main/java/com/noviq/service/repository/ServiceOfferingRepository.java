package com.noviq.service.repository;

import com.noviq.service.entity.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, UUID> {

    Optional<ServiceOffering> findBySlug(String slug);

    Optional<ServiceOffering> findBySlugAndActiveTrue(String slug);

    List<ServiceOffering> findAllByOrderByDisplayOrderAsc();

    List<ServiceOffering> findAllByActiveTrueOrderByDisplayOrderAsc();

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, UUID id);

    long countByActiveTrue();
}
