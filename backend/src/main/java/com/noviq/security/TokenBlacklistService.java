package com.noviq.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    private final Map<String, Instant> revokedTokens = new ConcurrentHashMap<>();

    public void revoke(String token, Instant expiresAt) {
        cleanup();
        revokedTokens.put(token, expiresAt);
    }

    public boolean isRevoked(String token) {
        cleanup();
        Instant expiry = revokedTokens.get(token);
        return expiry != null && expiry.isAfter(Instant.now());
    }

    private void cleanup() {
        Instant now = Instant.now();
        revokedTokens.entrySet().removeIf(entry -> !entry.getValue().isAfter(now));
    }
}
