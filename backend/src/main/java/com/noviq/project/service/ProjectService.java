package com.noviq.project.service;

import com.noviq.common.dto.IdOrderRequest;
import com.noviq.common.dto.PageResponse;
import com.noviq.common.exception.ConflictException;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.common.util.SlugUtil;
import com.noviq.project.dto.FeaturedUpdateRequest;
import com.noviq.project.dto.ProjectCardResponse;
import com.noviq.project.dto.ProjectDetailResponse;
import com.noviq.project.dto.ProjectImageResponse;
import com.noviq.project.dto.ProjectImageWriteRequest;
import com.noviq.project.dto.ProjectStatusUpdateRequest;
import com.noviq.project.dto.ProjectWriteRequest;
import com.noviq.project.entity.Project;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectImage;
import com.noviq.project.entity.ProjectStatus;
import com.noviq.project.entity.Technology;
import com.noviq.project.mapper.ProjectMapper;
import com.noviq.project.repository.ProjectRepository;
import com.noviq.project.repository.TechnologyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TechnologyRepository technologyRepository;
    private final ProjectMapper mapper;

    public ProjectService(
            ProjectRepository projectRepository,
            TechnologyRepository technologyRepository,
            ProjectMapper mapper
    ) {
        this.projectRepository = projectRepository;
        this.technologyRepository = technologyRepository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<ProjectCardResponse> listPublic(ProjectCategory category, int page, int size) {
        Pageable pageable = PageRequest.of(page, Math.min(size, 24), Sort.by("displayOrder").ascending().and(Sort.by("createdAt").descending()));
        Page<Project> result = projectRepository.findPublished(ProjectStatus.PUBLISHED, category, pageable);
        result.getContent().forEach(project -> project.getTechnologies().size());
        return PageResponse.from(result.map(mapper::toCard));
    }

    @Transactional(readOnly = true)
    public List<ProjectCardResponse> featured() {
        List<Project> featured = projectRepository.findFeaturedPublished(ProjectStatus.PUBLISHED);
        return featured.stream().map(mapper::toCard).toList();
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getPublicBySlug(String slug) {
        Project project = projectRepository.findWithDetailsBySlugAndStatus(slug, ProjectStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        return mapper.toDetail(project, previous(project), next(project));
    }

    @Transactional(readOnly = true)
    public PageResponse<ProjectCardResponse> listAdmin(String search, ProjectCategory category, ProjectStatus status, int page, int size) {
        boolean hasSearch = search != null && !search.isBlank();
        String query = hasSearch ? search.trim() : "";
        boolean hasCategory = category != null;
        boolean hasStatus = status != null;
        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), 50),
                Sort.by("displayOrder").ascending().and(Sort.by("createdAt").descending())
        );
        Page<Project> result = projectRepository.searchAdmin(
                query,
                hasSearch,
                hasCategory ? category : ProjectCategory.BRANDING,
                hasCategory,
                hasStatus ? status : ProjectStatus.DRAFT,
                hasStatus,
                pageable
        );
        return PageResponse.from(result.map(mapper::toCard));
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getAdmin(UUID id) {
        Project project = projectRepository.findWithDetailsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        return mapper.toDetail(project, null, null);
    }

    @Transactional
    public ProjectDetailResponse create(ProjectWriteRequest request) {
        String slug = resolveSlug(request.slug(), request.title(), null);
        Project project = new Project();
        apply(project, request, slug);
        Project saved = projectRepository.save(project);
        return mapper.toDetail(saved, null, null);
    }

    @Transactional
    public ProjectDetailResponse update(UUID id, ProjectWriteRequest request) {
        Project project = projectRepository.findWithDetailsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        String slug = resolveSlug(request.slug(), request.title(), id);
        apply(project, request, slug);
        return mapper.toDetail(project, null, null);
    }

    @Transactional
    public ProjectDetailResponse updateStatus(UUID id, ProjectStatusUpdateRequest request) {
        Project project = findById(id);
        project.setStatus(request.status());
        Project loaded = projectRepository.findWithDetailsById(id).orElse(project);
        return mapper.toDetail(loaded, null, null);
    }

    @Transactional
    public ProjectDetailResponse updateFeatured(UUID id, FeaturedUpdateRequest request) {
        Project project = findById(id);
        project.setFeatured(request.featured());
        Project loaded = projectRepository.findWithDetailsById(id).orElse(project);
        return mapper.toDetail(loaded, null, null);
    }

    @Transactional
    public void delete(UUID id) {
        Project project = findById(id);
        projectRepository.delete(project);
    }

    @Transactional
    public ProjectImageResponse addImage(UUID projectId, ProjectImageWriteRequest request) {
        Project project = projectRepository.findWithDetailsById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        ProjectImage image = new ProjectImage();
        image.setImageUrl(request.imageUrl().trim());
        image.setAltText(trimToNull(request.altText()));
        image.setCaption(trimToNull(request.caption()));
        image.setDisplayOrder(request.displayOrder());
        project.getImages().add(image);
        projectRepository.saveAndFlush(project);
        return mapper.toImage(image);
    }

    @Transactional
    public ProjectImageResponse updateImage(UUID projectId, UUID imageId, ProjectImageWriteRequest request) {
        Project project = projectRepository.findWithDetailsById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        ProjectImage image = project.getImages().stream()
                .filter(item -> item.getId().equals(imageId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Project image not found."));
        image.setImageUrl(request.imageUrl().trim());
        image.setAltText(trimToNull(request.altText()));
        image.setCaption(trimToNull(request.caption()));
        image.setDisplayOrder(request.displayOrder());
        return mapper.toImage(image);
    }

    @Transactional
    public void deleteImage(UUID projectId, UUID imageId) {
        Project project = projectRepository.findWithDetailsById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        boolean removed = project.getImages().removeIf(image -> image.getId().equals(imageId));
        if (!removed) {
            throw new ResourceNotFoundException("Project image not found.");
        }
    }

    @Transactional
    public List<ProjectImageResponse> reorderImages(UUID projectId, IdOrderRequest request) {
        Project project = projectRepository.findWithDetailsById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
        for (int index = 0; index < request.ids().size(); index++) {
            UUID imageId = request.ids().get(index);
            int order = index + 1;
            project.getImages().stream()
                    .filter(image -> image.getId().equals(imageId))
                    .findFirst()
                    .ifPresent(image -> image.setDisplayOrder(order));
        }
        return project.getImages().stream().map(mapper::toImage).toList();
    }

    private void apply(Project project, ProjectWriteRequest request, String slug) {
        project.setTitle(request.title().trim());
        project.setSlug(slug);
        project.setClientName(trimToNull(request.clientName()));
        project.setIndustry(trimToNull(request.industry()));
        project.setProjectYear(request.projectYear());
        project.setCategory(request.category());
        project.setShortDescription(request.shortDescription().trim());
        project.setCoverImageUrl(trimToNull(request.coverImageUrl()));
        project.setCoverImageAlt(trimToNull(request.coverImageAlt()));
        project.setOverview(trimToNull(request.overview()));
        project.setChallenge(trimToNull(request.challenge()));
        project.setApproach(trimToNull(request.approach()));
        project.setSolution(trimToNull(request.solution()));
        project.setResults(trimToNull(request.results()));
        project.setServicesProvided(trimToNull(request.servicesProvided()));
        project.setLiveUrl(trimToNull(request.liveUrl()));
        project.setBehanceUrl(trimToNull(request.behanceUrl()));
        project.setGithubUrl(trimToNull(request.githubUrl()));
        project.setFeatured(Boolean.TRUE.equals(request.featured()));
        project.setDisplayOrder(request.displayOrder());
        project.setStatus(request.status() == null ? ProjectStatus.DRAFT : request.status());
        project.setDemonstration(Boolean.TRUE.equals(request.demonstration()));

        project.getImages().clear();
        if (request.images() != null) {
            for (ProjectImageWriteRequest item : request.images()) {
                ProjectImage image = new ProjectImage();
                image.setImageUrl(item.imageUrl().trim());
                image.setAltText(trimToNull(item.altText()));
                image.setCaption(trimToNull(item.caption()));
                image.setDisplayOrder(item.displayOrder());
                project.getImages().add(image);
            }
        }

        Set<Technology> technologies = new LinkedHashSet<>();
        if (request.technologies() != null) {
            for (String name : request.technologies()) {
                if (name == null || name.isBlank()) {
                    continue;
                }
                technologies.add(resolveTechnology(name.trim()));
            }
        }
        project.getTechnologies().clear();
        project.getTechnologies().addAll(technologies);
    }

    private Technology resolveTechnology(String name) {
        return technologyRepository.findByNameIgnoreCase(name)
                .orElseGet(() -> {
                    Technology technology = new Technology();
                    technology.setName(name);
                    return technologyRepository.save(technology);
                });
    }

    private String resolveSlug(String requested, String title, UUID currentId) {
        String slug = SlugUtil.slugify(requested == null || requested.isBlank() ? title : requested);
        boolean taken = currentId == null
                ? projectRepository.existsBySlug(slug)
                : projectRepository.existsBySlugAndIdNot(slug, currentId);
        if (taken) {
            throw new ConflictException("A project with this slug already exists.");
        }
        return slug;
    }

    private Project previous(Project current) {
        List<Project> published = projectRepository.findAllByStatusOrderByDisplayOrderAscCreatedAtDesc(ProjectStatus.PUBLISHED);
        int index = indexOf(published, current.getId());
        if (index > 0) {
            return published.get(index - 1);
        }
        return null;
    }

    private Project next(Project current) {
        List<Project> published = projectRepository.findAllByStatusOrderByDisplayOrderAscCreatedAtDesc(ProjectStatus.PUBLISHED);
        int index = indexOf(published, current.getId());
        if (index >= 0 && index < published.size() - 1) {
            return published.get(index + 1);
        }
        return null;
    }

    private int indexOf(List<Project> projects, UUID id) {
        for (int i = 0; i < projects.size(); i++) {
            if (projects.get(i).getId().equals(id)) {
                return i;
            }
        }
        return -1;
    }

    private Project findById(UUID id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found."));
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
