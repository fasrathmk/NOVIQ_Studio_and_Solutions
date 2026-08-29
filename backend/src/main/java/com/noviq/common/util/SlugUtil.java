package com.noviq.common.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public final class SlugUtil {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s_]+");
    private static final Pattern DASHES = Pattern.compile("-{2,}");

    private SlugUtil() {
    }

    public static String slugify(String input) {
        if (input == null || input.isBlank()) {
            throw new IllegalArgumentException("A slug source is required.");
        }
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        String slug = WHITESPACE.matcher(normalized.trim().toLowerCase(Locale.ROOT)).replaceAll("-");
        slug = NON_LATIN.matcher(slug).replaceAll("");
        slug = DASHES.matcher(slug).replaceAll("-");
        slug = slug.replaceAll("(^-|-$)", "");
        if (slug.isBlank()) {
            throw new IllegalArgumentException("Unable to generate a valid slug.");
        }
        return slug;
    }
}
