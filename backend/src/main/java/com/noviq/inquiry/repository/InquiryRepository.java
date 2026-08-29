package com.noviq.inquiry.repository;

import com.noviq.inquiry.entity.Inquiry;
import com.noviq.inquiry.entity.InquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface InquiryRepository extends JpaRepository<Inquiry, UUID> {

    long countByStatus(InquiryStatus status);

    List<Inquiry> findTop8ByOrderByCreatedAtDesc();

    @Query("""
            SELECT i FROM Inquiry i
            WHERE (:status IS NULL OR i.status = :status)
              AND (:service IS NULL OR i.requiredService = :service)
              AND (
                    :search IS NULL
                    OR LOWER(i.fullName) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(i.email) LIKE LOWER(CONCAT('%', :search, '%'))
              )
            """)
    Page<Inquiry> search(
            @Param("search") String search,
            @Param("service") String service,
            @Param("status") InquiryStatus status,
            Pageable pageable
    );
}
