package com.noviq.inquiry;

import com.noviq.common.exception.GlobalExceptionHandler;
import com.noviq.inquiry.controller.PublicInquiryController;
import com.noviq.inquiry.service.InquiryService;
import com.noviq.security.JwtAuthenticationFilter;
import com.noviq.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PublicInquiryController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class InquiryValidationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private InquiryService inquiryService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void rejectsInvalidInquiryPayload() throws Exception {
        String body = """
                {
                  "fullName": "",
                  "email": "not-an-email",
                  "requiredService": "web-application-development",
                  "budgetRange": "NOT_DECIDED",
                  "projectDescription": "Too short",
                  "consent": false
                }
                """;

        mockMvc.perform(post("/api/v1/public/inquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.fieldErrors").isArray());
    }
}
