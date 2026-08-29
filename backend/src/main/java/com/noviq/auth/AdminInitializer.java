package com.noviq.auth;

import com.noviq.auth.entity.AdminUser;
import com.noviq.auth.repository.AdminUserRepository;
import com.noviq.config.NoviqProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AdminInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final NoviqProperties properties;

    public AdminInitializer(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            NoviqProperties properties
    ) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (adminUserRepository.count() > 0) {
            log.info("An administrator already exists. Skipping initial admin creation.");
            return;
        }

        String email = properties.getAdmin().getEmail();
        String password = properties.getAdmin().getPassword();
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            log.warn("No administrator exists. Set ADMIN_EMAIL and ADMIN_PASSWORD to create the first admin on startup.");
            return;
        }

        AdminUser admin = new AdminUser();
        admin.setEmail(email.trim().toLowerCase());
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setFullName("NOVIQ Administrator");
        admin.setRole("ADMIN");
        adminUserRepository.save(admin);
        log.info("Created the initial administrator for {}.", admin.getEmail());
    }
}
