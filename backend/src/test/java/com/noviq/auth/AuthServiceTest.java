package com.noviq.auth;

import com.noviq.auth.dto.LoginRequest;
import com.noviq.auth.entity.AdminUser;
import com.noviq.auth.repository.AdminUserRepository;
import com.noviq.auth.service.AuthService;
import com.noviq.security.AdminUserDetails;
import com.noviq.security.JwtService;
import com.noviq.security.TokenBlacklistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import io.jsonwebtoken.Claims;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;
    @Mock
    private TokenBlacklistService tokenBlacklistService;
    @Mock
    private AdminUserRepository adminUserRepository;

    private AuthService authService;
    private AdminUser admin;

    @BeforeEach
    void setUp() {
        authService = new AuthService(authenticationManager, jwtService, tokenBlacklistService, adminUserRepository);
        admin = new AdminUser();
        admin.setEmail("admin@noviq.local");
        admin.setFullName("NOVIQ Administrator");
        admin.setRole("ADMIN");
        admin.setPasswordHash("hashed");
        try {
            var field = AdminUser.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(admin, UUID.fromString("dddddddd-dddd-dddd-dddd-dddddddddddd"));
        } catch (ReflectiveOperationException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @Test
    void loginReturnsAccessTokenForValidCredentials() {
        AdminUserDetails principal = new AdminUserDetails(admin);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities()));
        when(jwtService.createAccessToken(admin.getId(), admin.getEmail())).thenReturn("jwt-token");
        when(jwtService.getExpirationMs()).thenReturn(3600000L);

        var response = authService.login(new LoginRequest("admin@noviq.local", "secure-pass"));

        assertThat(response.accessToken()).isEqualTo("jwt-token");
        assertThat(response.tokenType()).isEqualTo("Bearer");
        assertThat(response.admin().email()).isEqualTo("admin@noviq.local");
        assertThat(response.admin().role()).isEqualTo("ADMIN");
    }

    @Test
    void loginRejectsInvalidCredentials() {
        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThatThrownBy(() -> authService.login(new LoginRequest("admin@noviq.local", "wrong-pass")))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void logoutRevokesToken() {
        Claims claims = mock(Claims.class);
        when(claims.getExpiration()).thenReturn(Date.from(Instant.now().plusSeconds(60)));
        when(jwtService.parse("token-value")).thenReturn(claims);

        authService.logout("token-value");

        verify(tokenBlacklistService).revoke(org.mockito.ArgumentMatchers.eq("token-value"), any(Instant.class));
    }

    @Test
    void meReturnsCurrentAdministrator() {
        when(adminUserRepository.findById(admin.getId())).thenReturn(Optional.of(admin));

        var profile = authService.me(new AdminUserDetails(admin));

        assertThat(profile.email()).isEqualTo("admin@noviq.local");
        assertThat(profile.fullName()).isEqualTo("NOVIQ Administrator");
    }
}
