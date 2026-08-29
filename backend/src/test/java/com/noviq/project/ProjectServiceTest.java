package com.noviq.project;

import com.noviq.common.exception.ConflictException;
import com.noviq.common.exception.ResourceNotFoundException;
import com.noviq.project.dto.ProjectWriteRequest;
import com.noviq.project.entity.Project;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;
import com.noviq.project.mapper.ProjectMapper;
import com.noviq.project.repository.ProjectRepository;
import com.noviq.project.repository.TechnologyRepository;
import com.noviq.project.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private TechnologyRepository technologyRepository;

    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectService = new ProjectService(projectRepository, technologyRepository, new ProjectMapper());
    }

    @Test
    void createPersistsPublishedProject() {
        when(projectRepository.existsBySlug("scopilot-platform")).thenReturn(false);
        when(technologyRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.empty());
        when(technologyRepository.save(any(com.noviq.project.entity.Technology.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(projectRepository.save(any(Project.class))).thenAnswer(invocation -> {
            Project project = invocation.getArgument(0);
            setId(project, UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));
            return project;
        });

        var created = projectService.create(writeRequest("Scopilot Platform", "scopilot-platform", ProjectStatus.PUBLISHED));

        assertThat(created.title()).isEqualTo("Scopilot Platform");
        assertThat(created.slug()).isEqualTo("scopilot-platform");
        assertThat(created.status()).isEqualTo(ProjectStatus.PUBLISHED);
        ArgumentCaptor<Project> captor = ArgumentCaptor.forClass(Project.class);
        verify(projectRepository).save(captor.capture());
        assertThat(captor.getValue().getCategory()).isEqualTo(ProjectCategory.DEVELOPMENT);
    }

    @Test
    void createRejectsDuplicateSlug() {
        when(projectRepository.existsBySlug("scopilot-platform")).thenReturn(true);

        assertThatThrownBy(() -> projectService.create(writeRequest("Scopilot Platform", "scopilot-platform", ProjectStatus.DRAFT)))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("slug");
    }

    @Test
    void adminListQueriesAllStatusesWhenFiltersAreAbsent() {
        Project project = new Project();
        setId(project, UUID.randomUUID());
        project.setTitle("Student API");
        project.setSlug("student-api");
        project.setCategory(ProjectCategory.DEVELOPMENT);
        project.setShortDescription("A REST API for student records.");
        project.setStatus(ProjectStatus.PUBLISHED);
        when(projectRepository.searchAdmin(
                eq(""),
                eq(false),
                eq(ProjectCategory.BRANDING),
                eq(false),
                eq(ProjectStatus.DRAFT),
                eq(false),
                any(Pageable.class)
        )).thenReturn(new PageImpl<>(List.of(project)));

        var page = projectService.listAdmin(null, null, null, 0, 10);

        assertThat(page.content()).hasSize(1);
        assertThat(page.totalElements()).isEqualTo(1);
        assertThat(page.page()).isEqualTo(0);
    }

    @Test
    void publicListOnlyQueriesPublishedProjects() {
        Project project = new Project();
        setId(project, UUID.randomUUID());
        project.setTitle("Student API");
        project.setSlug("student-api");
        project.setCategory(ProjectCategory.DEVELOPMENT);
        project.setShortDescription("A REST API for student records.");
        project.setStatus(ProjectStatus.PUBLISHED);
        when(projectRepository.findPublished(eq(ProjectStatus.PUBLISHED), eq(ProjectCategory.DEVELOPMENT), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(project)));

        var page = projectService.listPublic(ProjectCategory.DEVELOPMENT, 0, 9);

        assertThat(page.content()).hasSize(1);
        assertThat(page.content().getFirst().slug()).isEqualTo("student-api");
    }

    @Test
    void publicDetailRejectsMissingProject() {
        when(projectRepository.findWithDetailsBySlugAndStatus("missing", ProjectStatus.PUBLISHED))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.getPublicBySlug("missing"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void deleteRemovesExistingProject() {
        Project project = new Project();
        UUID id = UUID.randomUUID();
        setId(project, id);
        when(projectRepository.findById(id)).thenReturn(Optional.of(project));

        projectService.delete(id);

        verify(projectRepository).delete(project);
    }

    private ProjectWriteRequest writeRequest(String title, String slug, ProjectStatus status) {
        return new ProjectWriteRequest(
                title,
                slug,
                null,
                "Software",
                2026,
                ProjectCategory.DEVELOPMENT,
                "A demonstration project used in tests.",
                null,
                null,
                "Overview",
                "Challenge",
                "Approach",
                "Solution",
                "Demonstration content only.",
                "Development",
                null,
                null,
                null,
                true,
                1,
                status,
                true,
                List.of("Java"),
                List.of()
        );
    }

    private void setId(Project project, UUID id) {
        try {
            var field = Project.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(project, id);
        } catch (ReflectiveOperationException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
