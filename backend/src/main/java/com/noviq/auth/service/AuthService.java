package com.noviq.auth.service;

import com.noviq.auth.dto.AdminProfileResponse;
import com.noviq.auth.dto.LoginRequest;
import com.noviq.auth.dto.LoginResponse;
import com.noviq.auth.entity.AdminUser;
import com.noviq.auth.repository.AdminUserRepository;
import com.noviq.security.AdminUserDetails;
import com.noviq.security.JwtService;
import com.noviq.security.TokenBlacklistService;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenBlacklistService tokenBlacklistService;
    private final AdminUserRepository adminUserRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            TokenBlacklistService tokenBlacklistService,
            AdminUserRepository adminUserRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.tokenBlacklistService = tokenBlacklistService;
        this.adminUserRepository = adminUserRepository;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password())
        );
        AdminUserDetails principal = (AdminUserDetails) authentication.getPrincipal();
        AdminUser admin = principal.getAdminUser();
        String token = jwtService.createAccessToken(admin.getId(), admin.getEmail());
        return new LoginResponse(
                token,
                "Bearer",
                jwtService.getExpirationMs() / 1000,
                toProfile(admin)
        );
    }

    @Transactional(readOnly = true)
    public AdminProfileResponse me(AdminUserDetails principal) {
        AdminUser admin = adminUserRepository.findById(principal.getId()).orElseThrow();
        return toProfile(admin);
    }

    public void logout(String token) {
        if (token == null || token.isBlank()) {
            return;
        }
        try {
            Claims claims = jwtService.parse(token);
            Instant expiry = claims.getExpiration().toInstant();
            tokenBlacklistService.revoke(token, expiry);
        } catch (RuntimeException ignored) {
            // Expired or invalid tokens are already unusable.
        }
    }

    private AdminProfileResponse toProfile(AdminUser admin) {
        return new AdminProfileResponse(
                admin.getId().toString(),
                admin.getEmail(),
                admin.getFullName(),
                admin.getRole()
        );
    }
}
