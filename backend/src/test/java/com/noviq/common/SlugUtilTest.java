package com.noviq.common;

import com.noviq.common.util.SlugUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SlugUtilTest {

    @Test
    void slugifiesTitles() {
        assertThat(SlugUtil.slugify("Scopilot – Freelancer Scope Management"))
                .isEqualTo("scopilot-freelancer-scope-management");
    }

    @Test
    void rejectsBlankInput() {
        assertThatThrownBy(() -> SlugUtil.slugify("   "))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
