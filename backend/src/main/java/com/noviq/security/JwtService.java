package com.noviq.security;

import com.noviq.config.NoviqProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private final NoviqProperties properties;

    public JwtService(NoviqProperties properties) {
        this.properties = properties;
    }

    public String createAccessToken(UUID adminId, String email) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(properties.getJwt().getExpirationMs());
        return Jwts.builder()
                .subject(adminId.toString())
                .claim("email", email)
                .claim("role", "ADMIN")
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(signingKey())
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public long getExpirationMs() {
        return properties.getJwt().getExpirationMs();
    }

    private SecretKey signingKey() {
        String secret = properties.getJwt().getSecret();
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters.");
        }
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
