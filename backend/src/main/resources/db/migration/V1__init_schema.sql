CREATE TABLE admin_users (
    id              UUID PRIMARY KEY,
    email           VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(150) NOT NULL,
    role            VARCHAR(20)  NOT NULL DEFAULT 'ADMIN',
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_admin_users_email UNIQUE (email),
    CONSTRAINT ck_admin_users_role CHECK (role = 'ADMIN')
);

CREATE TABLE services (
    id                  UUID PRIMARY KEY,
    title               VARCHAR(200) NOT NULL,
    slug                VARCHAR(200) NOT NULL,
    capability_group    VARCHAR(50)  NOT NULL,
    short_description   VARCHAR(500) NOT NULL,
    full_description    TEXT         NOT NULL,
    problems_solved     TEXT,
    contact_cta         VARCHAR(300),
    active              BOOLEAN      NOT NULL DEFAULT TRUE,
    display_order       INTEGER      NOT NULL,
    is_protected        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_services_slug UNIQUE (slug),
    CONSTRAINT ck_services_capability_group CHECK (
        capability_group IN ('DESIGN', 'TECHNOLOGY', 'VISUALIZATION')
    )
);

CREATE INDEX idx_services_active_order ON services (active, display_order);

CREATE TABLE service_deliverables (
    id              UUID PRIMARY KEY,
    service_id      UUID         NOT NULL REFERENCES services (id) ON DELETE CASCADE,
    title           VARCHAR(300) NOT NULL,
    description     VARCHAR(1000),
    display_order   INTEGER      NOT NULL
);

CREATE INDEX idx_service_deliverables_service ON service_deliverables (service_id, display_order);

CREATE TABLE service_process_steps (
    id              UUID PRIMARY KEY,
    service_id      UUID         NOT NULL REFERENCES services (id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    description     VARCHAR(1000),
    display_order   INTEGER      NOT NULL
);

CREATE INDEX idx_service_process_steps_service ON service_process_steps (service_id, display_order);

CREATE TABLE service_faqs (
    id              UUID PRIMARY KEY,
    service_id      UUID         NOT NULL REFERENCES services (id) ON DELETE CASCADE,
    question        VARCHAR(500) NOT NULL,
    answer          TEXT         NOT NULL,
    display_order   INTEGER      NOT NULL
);

CREATE INDEX idx_service_faqs_service ON service_faqs (service_id, display_order);

CREATE TABLE technologies (
    id          UUID PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_technologies_name UNIQUE (name)
);

CREATE TABLE projects (
    id                  UUID PRIMARY KEY,
    title               VARCHAR(250) NOT NULL,
    slug                VARCHAR(250) NOT NULL,
    client_name         VARCHAR(200),
    industry            VARCHAR(150),
    project_year        INTEGER,
    category            VARCHAR(50)  NOT NULL,
    short_description   VARCHAR(500) NOT NULL,
    cover_image_url     VARCHAR(1000),
    cover_image_alt     VARCHAR(250),
    overview            TEXT,
    challenge           TEXT,
    approach            TEXT,
    solution            TEXT,
    results             TEXT,
    services_provided   TEXT,
    live_url            VARCHAR(500),
    behance_url         VARCHAR(500),
    github_url          VARCHAR(500),
    featured            BOOLEAN      NOT NULL DEFAULT FALSE,
    display_order       INTEGER      NOT NULL DEFAULT 0,
    status              VARCHAR(20)  NOT NULL,
    demonstration       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_projects_slug UNIQUE (slug),
    CONSTRAINT ck_projects_category CHECK (
        category IN ('BRANDING', 'UI_UX', 'DEVELOPMENT', 'AUTOMATION', 'LANDSCAPE')
    ),
    CONSTRAINT ck_projects_status CHECK (
        status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')
    )
);

CREATE INDEX idx_projects_status_category ON projects (status, category);
CREATE INDEX idx_projects_featured ON projects (featured, status, display_order);
CREATE INDEX idx_projects_display_order ON projects (display_order, created_at);

CREATE TABLE project_images (
    id              UUID PRIMARY KEY,
    project_id      UUID          NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    image_url       VARCHAR(1000) NOT NULL,
    alt_text        VARCHAR(250),
    caption         VARCHAR(500),
    display_order   INTEGER       NOT NULL
);

CREATE INDEX idx_project_images_project ON project_images (project_id, display_order);

CREATE TABLE project_technologies (
    project_id      UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    technology_id   UUID NOT NULL REFERENCES technologies (id) ON DELETE RESTRICT,
    PRIMARY KEY (project_id, technology_id)
);

CREATE TABLE testimonials (
    id                  UUID PRIMARY KEY,
    client_name         VARCHAR(150) NOT NULL,
    company_or_role     VARCHAR(200),
    quote               TEXT         NOT NULL,
    profile_image_url   VARCHAR(1000),
    project_id          UUID         REFERENCES projects (id) ON DELETE SET NULL,
    approved            BOOLEAN      NOT NULL DEFAULT FALSE,
    demonstration       BOOLEAN      NOT NULL DEFAULT FALSE,
    display_order       INTEGER      NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_testimonials_approved_order ON testimonials (approved, display_order);

CREATE TABLE team_members (
    id              UUID PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    role            VARCHAR(150) NOT NULL,
    biography       VARCHAR(1000),
    image_url       VARCHAR(1000),
    linkedin_url    VARCHAR(500),
    behance_url     VARCHAR(500),
    github_url      VARCHAR(500),
    active          BOOLEAN      NOT NULL DEFAULT TRUE,
    display_order   INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_team_members_active_order ON team_members (active, display_order);

CREATE TABLE inquiries (
    id                      UUID PRIMARY KEY,
    full_name               VARCHAR(150) NOT NULL,
    email                   VARCHAR(255) NOT NULL,
    phone                   VARCHAR(50),
    company_name            VARCHAR(200),
    required_service        VARCHAR(100) NOT NULL,
    budget_range            VARCHAR(50)  NOT NULL,
    expected_deadline       DATE,
    project_description     TEXT         NOT NULL,
    reference_url           VARCHAR(500),
    consent                 BOOLEAN      NOT NULL,
    status                  VARCHAR(30)  NOT NULL DEFAULT 'NEW',
    internal_note           TEXT,
    created_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_inquiries_budget CHECK (
        budget_range IN (
            'UNDER_100',
            'FROM_100_TO_300',
            'FROM_300_TO_750',
            'FROM_750_TO_1500',
            'FROM_1500_PLUS',
            'NOT_DECIDED'
        )
    ),
    CONSTRAINT ck_inquiries_status CHECK (
        status IN (
            'NEW',
            'CONTACTED',
            'IN_DISCUSSION',
            'ACCEPTED',
            'COMPLETED',
            'REJECTED',
            'SPAM',
            'ARCHIVED'
        )
    ),
    CONSTRAINT ck_inquiries_consent CHECK (consent = TRUE)
);

CREATE INDEX idx_inquiries_status_created ON inquiries (status, created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries (email);
CREATE INDEX idx_inquiries_service ON inquiries (required_service);

CREATE TABLE site_settings (
    id                      UUID PRIMARY KEY,
    hero_heading            VARCHAR(300) NOT NULL,
    hero_supporting_text    VARCHAR(1000) NOT NULL,
    primary_email           VARCHAR(255) NOT NULL,
    phone                   VARCHAR(50),
    location                VARCHAR(300),
    instagram_url           VARCHAR(500),
    facebook_url            VARCHAR(500),
    linkedin_url            VARCHAR(500),
    behance_url             VARCHAR(500),
    github_url              VARCHAR(500),
    footer_description      VARCHAR(1000) NOT NULL,
    default_seo_title       VARCHAR(200) NOT NULL,
    default_seo_description VARCHAR(500) NOT NULL,
    updated_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
