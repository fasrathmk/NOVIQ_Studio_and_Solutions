package com.noviq.project;

import com.noviq.common.exception.GlobalExceptionHandler;
import com.noviq.project.controller.PublicProjectController;
import com.noviq.project.dto.ProjectCardResponse;
import com.noviq.project.entity.ProjectCategory;
import com.noviq.project.entity.ProjectStatus;
import com.noviq.project.service.ProjectService;
import com.noviq.security.JwtAuthenticationFilter;
import com.noviq.security.JwtService;
import com.noviq.common.dto.PageResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PublicProjectController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class PublicProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void listsPublishedProjects() throws Exception {
        ProjectCardResponse card = new ProjectCardResponse(
                "id",
                "Student Management CRUD REST API",
                "student-management-crud-rest-api",
                ProjectCategory.DEVELOPMENT,
                "A REST API providing complete student-management CRUD operations.",
                null,
                null,
                List.of("Java", "Spring Boot"),
                true,
                true,
                ProjectStatus.PUBLISHED,
                2,
                2025
        );
        when(projectService.listPublic(ProjectCategory.DEVELOPMENT, 0, 9))
                .thenReturn(new PageResponse<>(List.of(card), 0, 9, 1, 1, true, true));

        mockMvc.perform(get("/api/v1/public/projects").param("category", "DEVELOPMENT"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].slug").value("student-management-crud-rest-api"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }
}
