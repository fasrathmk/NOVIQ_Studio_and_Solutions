package com.noviq.auth.controller;

import com.noviq.auth.dto.AdminProfileResponse;
import com.noviq.auth.dto.LoginRequest;
import com.noviq.auth.dto.LoginResponse;
import com.noviq.auth.service.AuthService;
import com.noviq.common.dto.MessageResponse;
import com.noviq.security.AdminUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logout(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String header) {
        String token = extractToken(header);
        authService.logout(token);
        return ResponseEntity.ok(new MessageResponse("Signed out."));
    }

    @GetMapping("/me")
    public AdminProfileResponse me(@AuthenticationPrincipal AdminUserDetails principal) {
        return authService.me(principal);
    }

    private String extractToken(String header) {
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
