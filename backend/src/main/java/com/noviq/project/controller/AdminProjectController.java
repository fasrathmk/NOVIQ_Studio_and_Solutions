package com.noviq.project.controller;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.common.dto.PageResponse;
import com.noviq.project.dto.FeaturedUpdateRequest;
import com.noviq.project.dto.ProjectCardResponse;
import com.noviq.project.dto.ProjectDetailResponse;
import com.noviq.project.dto.ProjectImageResponse;
import com.noviq.project.dto.ProjectImageWriteRequest;
import com.noviq.project.dto.ProjectStatusUpdateRequest;
import com.noviq.project.dto.ProjectWriteRequest;
import com.noviq.common.exception.BadRequestException;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;
import com.noviq.project.service.ProjectService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/projects")
public class AdminProjectController {

    private final ProjectService projectService;

    public AdminProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public PageResponse<ProjectCardResponse> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return projectService.listAdmin(
                blankToNull(search),
                parseEnum(category, ProjectCategory.class),
                parseEnum(status, ProjectStatus.class),
                page,
                size
        );
    }

    @GetMapping("/{id}")
    public ProjectDetailResponse get(@PathVariable UUID id) {
        return projectService.getAdmin(id);
    }

    @PostMapping
    public ResponseEntity<ProjectDetailResponse> create(@Valid @RequestBody ProjectWriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.create(request));
    }

    @PutMapping("/{id}")
    public ProjectDetailResponse update(@PathVariable UUID id, @Valid @RequestBody ProjectWriteRequest request) {
        return projectService.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public ProjectDetailResponse updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectStatusUpdateRequest request
    ) {
        return projectService.updateStatus(id, request);
    }

    @PatchMapping("/{id}/featured")
    public ProjectDetailResponse updateFeatured(
            @PathVariable UUID id,
            @Valid @RequestBody FeaturedUpdateRequest request
    ) {
        return projectService.updateFeatured(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<ProjectImageResponse> addImage(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectImageWriteRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addImage(id, request));
    }

    @PutMapping("/{id}/images/{imageId}")
    public ProjectImageResponse updateImage(
            @PathVariable UUID id,
            @PathVariable UUID imageId,
            @Valid @RequestBody ProjectImageWriteRequest request
    ) {
        return projectService.updateImage(id, imageId, request);
    }

    @DeleteMapping("/{id}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable UUID id, @PathVariable UUID imageId) {
        projectService.deleteImage(id, imageId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/images/reorder")
    public List<ProjectImageResponse> reorderImages(
            @PathVariable UUID id,
            @Valid @RequestBody IdOrderRequest request
    ) {
        return projectService.reorderImages(id, request);
    }

    private static String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private static <E extends Enum<E>> E parseEnum(String value, Class<E> type) {
        if (value == null || value.isBlank() || "ALL".equalsIgnoreCase(value.trim())) {
            return null;
        }
        try {
            return Enum.valueOf(type, value.trim());
        } catch (IllegalArgumentException exception) {
            throw new BadRequestException("A request parameter has an invalid value.");
        }
    }
}
