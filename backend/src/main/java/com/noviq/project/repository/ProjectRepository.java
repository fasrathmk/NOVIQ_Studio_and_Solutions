package com.noviq.project.repository;

import com.noviq.project.entity.Project;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, UUID id);

    long countByStatus(ProjectStatus status);

    @EntityGraph(attributePaths = {"images", "technologies"})
    Optional<Project> findWithDetailsById(UUID id);

    @EntityGraph(attributePaths = {"images", "technologies"})
    Optional<Project> findWithDetailsBySlugAndStatus(String slug, ProjectStatus status);

    @Query("""
            SELECT DISTINCT p FROM Project p
            LEFT JOIN FETCH p.technologies
            WHERE p.status = :status AND p.featured = TRUE
            ORDER BY p.displayOrder ASC, p.createdAt DESC
            """)
    List<Project> findFeaturedPublished(@Param("status") ProjectStatus status);

    @Query("""
            SELECT p FROM Project p
            WHERE p.status = :status
              AND (:category IS NULL OR p.category = :category)
            """)
    Page<Project> findPublished(
            @Param("status") ProjectStatus status,
            @Param("category") ProjectCategory category,
            Pageable pageable
    );

    @EntityGraph(attributePaths = "technologies")
    @Query("""
            SELECT p FROM Project p
            WHERE (:hasStatus = FALSE OR p.status = :status)
              AND (:hasCategory = FALSE OR p.category = :category)
              AND (
                    :hasSearch = FALSE
                    OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(p.slug) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(COALESCE(p.clientName, '')) LIKE LOWER(CONCAT('%', :search, '%'))
              )
            """)
    Page<Project> searchAdmin(
            @Param("search") String search,
            @Param("hasSearch") boolean hasSearch,
            @Param("category") ProjectCategory category,
            @Param("hasCategory") boolean hasCategory,
            @Param("status") ProjectStatus status,
            @Param("hasStatus") boolean hasStatus,
            Pageable pageable
    );

    @Query("""
            SELECT p FROM Project p
            WHERE p.status = com.noviq.project.entity.ProjectStatus.PUBLISHED
              AND p.category = :category
              AND p.slug <> :slug
            ORDER BY p.displayOrder ASC, p.createdAt DESC
            """)
    List<Project> findRelatedPublished(@Param("category") ProjectCategory category, @Param("slug") String slug);

    List<Project> findAllByStatusOrderByDisplayOrderAscCreatedAtDesc(ProjectStatus status);
}
