package com.noviq.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Path userDir = Path.of(System.getProperty("user.dir", "."));
        Path[] candidates = new Path[] {
                Path.of(".env"),
                Path.of("backend/.env"),
                userDir.resolve(".env"),
                userDir.resolve("backend/.env")
        };
        for (Path path : candidates) {
            if (Files.isRegularFile(path)) {
                environment.getPropertySources().addFirst(new MapPropertySource("noviqDotenv", parse(path)));
                return;
            }
        }
    }

    private Map<String, Object> parse(Path path) {
        Map<String, Object> values = new LinkedHashMap<>();
        try {
            List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
            for (String raw : lines) {
                String line = raw.trim();
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }
                int separator = line.indexOf('=');
                if (separator <= 0) {
                    continue;
                }
                String key = line.substring(0, separator).trim();
                String value = line.substring(separator + 1).trim();
                if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.substring(1, value.length() - 1);
                }
                values.put(key, value);
            }
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to read environment file: " + path, exception);
        }
        return values;
    }
}
