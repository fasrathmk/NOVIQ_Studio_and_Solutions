package com.noviq.security;

import com.noviq.config.PropertiesConfig;
import com.noviq.project.controller.AdminProjectController;
import com.noviq.project.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminProjectController.class)
@Import({PropertiesConfig.class, SecurityConfig.class, JwtAuthenticationFilter.class, JwtService.class,
        TokenBlacklistService.class, RestAuthenticationEntryPoint.class, RestAccessDeniedHandler.class})
class AdminEndpointSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @MockitoBean
    private com.noviq.auth.repository.AdminUserRepository adminUserRepository;

    @Test
    void adminProjectsRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/admin/projects"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.path").value("/api/v1/admin/projects"));
    }

    @Test
    void invalidTokenIsRejected() throws Exception {
        mockMvc.perform(get("/api/v1/admin/projects").header("Authorization", "Bearer not-a-valid-token"))
                .andExpect(status().isUnauthorized());
    }
}
