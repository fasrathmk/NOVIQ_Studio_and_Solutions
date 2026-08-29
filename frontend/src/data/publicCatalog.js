function items(rows) {
  return rows.map((row, index) => ({
    id: `${row[0]}-${index + 1}`,
    title: row[0],
    description: row[1] || '',
    displayOrder: index + 1,
  }));
}

function faqs(rows) {
  return rows.map((row, index) => ({
    id: `faq-${index + 1}-${row[0].slice(0, 12)}`,
    question: row[0],
    answer: row[1],
    displayOrder: index + 1,
  }));
}

const SERVICE_DETAILS = {
  'logo-design-brand-identity': {
    title: 'Logo Design & Brand Identity',
    slug: 'logo-design-brand-identity',
    capabilityGroup: 'DESIGN',
    shortDescription: 'Distinctive logo systems and brand identities that help businesses look considered, consistent, and ready to grow.',
    fullDescription: 'A brand identity is more than a logo. NOVIQ builds visual systems that communicate positioning, support daily use, and stay coherent across print, packaging, and digital channels. We define the strategy, design the marks, and document how they should be used so teams can apply the brand with confidence.',
    problemsSolved: 'Unclear visual positioning, inconsistent brand assets, logos that do not scale, missing guidelines, and weak digital or packaging applications.',
    contactCta: 'Start a brand identity project',
    displayOrder: 1,
    deliverables: items([
      ['Logo systems', 'Primary, secondary, and simplified marks for print and digital use.'],
      ['Brand strategy', 'Positioning, audience, and visual direction that inform the identity.'],
      ['Visual identity', 'Supporting graphic language, patterns, and imagery guidance.'],
      ['Typography and color selection', 'Type pairings and a practical color system with usage notes.'],
      ['Brand guidelines', 'A reference document covering logo use, spacing, color, and tone.'],
      ['Social-media assets', 'Profile, cover, and post templates aligned with the identity.'],
      ['Packaging and label design', 'Label systems and packaging layouts when the project requires them.'],
    ]),
    processSteps: items([
      ['Discover', 'Review the business, audience, competitors, and existing materials.'],
      ['Direction', 'Define positioning and visual routes before detailed design.'],
      ['Design', 'Develop logo options and the supporting identity system.'],
      ['Refine', 'Test applications and tighten spacing, color, and usage rules.'],
      ['Deliver', 'Provide final files, guidelines, and agreed application assets.'],
    ]),
    faqs: faqs([
      ['Do you only design logos?', 'No. Logo work is usually part of a wider identity: color, type, applications, and guidelines.'],
      ['Will I receive editable files?', 'Yes. Final delivery includes agreed source files and exported assets for common use.'],
      ['Can you refresh an existing brand?', 'Yes. We can refine an existing mark and system rather than starting from nothing.'],
    ]),
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    capabilityGroup: 'DESIGN',
    shortDescription: 'Research-led interface design for websites and applications, from structure and wireframes to polished design systems.',
    fullDescription: 'NOVIQ designs interfaces that are clear, usable, and aligned with the product. We map user needs, structure information, prototype interactions, and refine visual language so development teams can implement with fewer ambiguities.',
    problemsSolved: 'Confusing navigation, weak information architecture, inconsistent UI, low conversion, and design that is difficult to implement.',
    contactCta: 'Discuss a UI/UX project',
    displayOrder: 2,
    deliverables: items([
      ['User research', 'Interviews, reviews, and synthesis that clarify real user needs.'],
      ['Information architecture', 'Sitemaps and content structure for clearer navigation.'],
      ['Wireframes', 'Low- and mid-fidelity layouts used to agree structure early.'],
      ['Website UI design', 'High-fidelity website interfaces ready for development.'],
      ['Mobile application UI design', 'Screen flows designed for smaller viewports and native patterns.'],
      ['Interactive prototypes', 'Clickable prototypes for review, testing, and stakeholder alignment.'],
      ['Design systems', 'Reusable components, tokens, and documentation for implementation.'],
      ['UX improvement', 'Targeted audits and redesigns for existing products.'],
    ]),
    processSteps: items([
      ['Research', 'Understand users, content, and constraints before drawing screens.'],
      ['Structure', 'Define IA, flows, and wireframes for review.'],
      ['Interface', 'Design high-fidelity UI and interaction patterns.'],
      ['Prototype', 'Assemble a clickable prototype for testing and alignment.'],
      ['Handoff', 'Prepare specs, assets, and a design system for development.'],
    ]),
    faqs: faqs([
      ['Do you design before development?', 'Yes. Structure and UI are resolved before implementation whenever the project allows it.'],
      ['Can you improve an existing product?', 'Yes. We audit current flows and redesign the areas that cause the most friction.'],
      ['Do you provide developer handoff?', 'Yes. Designs are prepared with components, spacing, and states that developers can implement.'],
    ]),
  },
  'web-application-development': {
    title: 'Web Application Development',
    slug: 'web-application-development',
    capabilityGroup: 'TECHNOLOGY',
    shortDescription: 'Full-stack web applications and business websites built with React, Spring Boot, REST APIs, and PostgreSQL.',
    fullDescription: 'NOVIQ builds reliable web products: business websites, portfolio platforms, and custom applications. Frontends are implemented in React with a focus on accessibility and maintainability. Backends use Spring Boot, validated REST APIs, and PostgreSQL. We also support ongoing maintenance and improvement after launch.',
    problemsSolved: 'Outdated websites, missing backend structure, unclear APIs, poor data persistence, and products that are difficult to maintain.',
    contactCta: 'Start a development project',
    displayOrder: 3,
    deliverables: items([
      ['Business websites', 'Clear marketing sites with structured content and contact flows.'],
      ['Portfolio websites', 'Project-led sites for studios, freelancers, and agencies.'],
      ['Full-stack applications', 'Custom products with authenticated areas and persistent data.'],
      ['React frontend development', 'Component-based interfaces with routing, forms, and API integration.'],
      ['Spring Boot backend development', 'Java services with validation, security, and business rules.'],
      ['REST API development', 'Documented endpoints with consistent error handling.'],
      ['PostgreSQL integration', 'Normalized schemas, migrations, and reliable persistence.'],
      ['Maintenance and improvement', 'Fixes, refinements, and feature work after launch.'],
    ]),
    processSteps: items([
      ['Scope', 'Agree features, constraints, and delivery sequence.'],
      ['Architecture', 'Define data model, APIs, and frontend structure.'],
      ['Build', 'Implement frontend, backend, validation, and persistence.'],
      ['Test', 'Verify flows, security, and edge cases before release.'],
      ['Launch', 'Deploy locally documented releases and plan next improvements.'],
    ]),
    faqs: faqs([
      ['Which stack do you use?', 'React and Vite on the frontend, Spring Boot and PostgreSQL on the backend, with REST APIs between them.'],
      ['Can you work from an existing design?', 'Yes. We can implement provided UI or design and build together.'],
      ['Do you maintain projects after launch?', 'Yes. Maintenance and improvement can be scoped after the first delivery.'],
    ]),
  },
  'business-automation': {
    title: 'Business Automation',
    slug: 'business-automation',
    capabilityGroup: 'TECHNOLOGY',
    shortDescription: 'Practical automation for leads, email, CRM, and internal workflows using n8n, APIs, and Google Workspace.',
    fullDescription: 'NOVIQ designs automation that reduces repetitive work without hiding the process. Typical work includes lead qualification, email sequences, Google Workspace connections, CRM updates, API integrations, and carefully scoped AI-assisted steps where they add value.',
    problemsSolved: 'Manual lead follow-up, delayed responses, disconnected tools, repeated data entry, and workflows that depend on one person.',
    contactCta: 'Map an automation workflow',
    displayOrder: 4,
    deliverables: items([
      ['n8n workflows', 'Visual automations with clear triggers, branches, and logging.'],
      ['Lead qualification', 'Rules that sort incoming leads by budget, timing, and fit.'],
      ['Email automation', 'Timely responses and follow-ups without manual copying.'],
      ['Google Workspace integration', 'Sheets, Gmail, Drive, and related workspace connections.'],
      ['CRM workflows', 'Status updates and hand-offs into the tools already in use.'],
      ['API integration', 'Connections between forms, products, and third-party services.'],
      ['AI-assisted automation', 'Scoped AI steps for classification or drafting where they are useful.'],
    ]),
    processSteps: items([
      ['Map', 'Document the current process, tools, and failure points.'],
      ['Design', 'Define triggers, conditions, and the desired outcomes.'],
      ['Connect', 'Integrate forms, email, sheets, CRM, or APIs.'],
      ['Automate', 'Build and test the workflow with realistic sample data.'],
      ['Handover', 'Document how to monitor, edit, and extend the workflow.'],
    ]),
    faqs: faqs([
      ['Do I need n8n already?', 'No. We can design the workflow first and set up n8n as part of the project if needed.'],
      ['Can automation connect to my current tools?', 'Usually yes, if the tool has an API, webhook, or a supported n8n integration.'],
      ['Will I be able to edit the workflow later?', 'Yes. Workflows are documented so they can be reviewed and adjusted.'],
    ]),
  },
  'business-analysis': {
    title: 'Business Analysis',
    slug: 'business-analysis',
    capabilityGroup: 'TECHNOLOGY',
    shortDescription: 'Turning business needs into clear requirements, practical processes, and actionable solutions.',
    fullDescription: 'NOVIQ helps businesses understand their current challenges, define clear requirements, improve processes, and translate business needs into practical digital solutions.\n\nThe work sits between the people who know the operation and the people who will design or build a change. We document how work happens today, agree what should change, and produce requirements that a team can implement without guessing.',
    problemsSolved: 'Unclear business requirements, inefficient manual processes, communication gaps between business and technical teams, poorly defined software requirements, repetitive business processes, lack of process documentation, unclear project scope, and difficulty identifying automation opportunities.',
    contactCta: 'Discuss Your Business',
    displayOrder: 5,
    deliverables: items([
      ['Business Requirements Document (BRD)', 'A shared statement of business needs, scope, and expected outcomes.'],
      ['Software Requirements Specification (SRS)', 'A structured specification that development teams can implement against.'],
      ['Functional Requirements', 'What the process or system must do, written in plain language.'],
      ['User Stories', 'Work items framed around the person who needs a result.'],
      ['Acceptance Criteria', 'Clear conditions that show when a requirement is complete.'],
      ['Use Cases', 'Step-by-step interactions between people, systems, and outcomes.'],
      ['Process Flow Diagrams', 'Visual maps of the current or proposed workflow.'],
      ['As-Is / To-Be Process Analysis', 'A comparison of how work happens now and how it should happen next.'],
      ['Gap Analysis', 'The differences between current capability and the required outcome.'],
      ['Stakeholder Analysis', 'Who is involved, what they need, and how they influence the work.'],
      ['Business Process Documentation', 'A written record teams can use after the analysis is finished.'],
      ['Requirement Traceability Matrix', 'A map from each requirement to its source, owner, and later work.'],
      ['Project Scope Definition', 'What is included, what is excluded, and what would change the brief.'],
      ['Automation Opportunity Analysis', 'A practical review of which repetitive steps are worth automating.'],
    ]),
    processSteps: items([
      ['Discover', 'Listen to the business, gather context, and identify the people involved.'],
      ['Understand', 'Clarify goals, constraints, and how work currently happens.'],
      ['Analyze', 'Map gaps, friction, and where a clearer process or system would help.'],
      ['Document', 'Write requirements, flows, and scope in a form teams can use.'],
      ['Validate', 'Review the documents with stakeholders and correct misunderstandings.'],
      ['Recommend', 'Propose a practical next step: process change, automation, or software.'],
    ]),
    faqs: faqs([
      ['What does a business analyst do?', 'A business analyst clarifies how work happens today, what needs to change, and what a solution must do. At NOVIQ that usually means interviews, process maps, requirements, and a written recommendation the design or development team can use.'],
      ['When does a business need business analysis?', 'It is useful when a process is unclear, when software is about to be built or changed, or when teams disagree about scope. Analysis is also useful before automation, so the workflow is understood before it is connected.'],
      ['Can NOVIQ analyze an existing business process?', 'Yes. Existing processes can be documented as they are, then compared with a proposed to-be process. The aim is a clearer picture, not a claim that every process must be replaced.'],
      ['Can Business Analysis be combined with automation?', 'Yes. Analysis often comes first so the automation is based on a documented process rather than an assumed one. The same work can also lead into software development when a new product is the better fit.'],
      ['Can NOVIQ create software requirements before development?', 'Yes. Requirements, user stories, and acceptance criteria can be prepared before implementation so the build starts from an agreed brief.'],
      ['What documents will we receive?', 'Delivery depends on the brief. Typical packages include a BRD or SRS, process flows, user stories with acceptance criteria, and a written scope. We agree the document set before the work starts.'],
    ]),
  },
  '3d-landscape-design': {
    title: '3D Landscape Design',
    slug: '3d-landscape-design',
    capabilityGroup: 'VISUALIZATION',
    shortDescription: '3D landscape visualization, garden concepts, and outdoor-space planning for clearer design decisions.',
    fullDescription: 'NOVIQ visualizes outdoor spaces so clients can evaluate layout, planting, materials, and atmosphere before construction. Work includes landscape concepts, 3D modelling, architectural visualization, and presentation renders for gardens, courtyards, and related outdoor environments.',
    problemsSolved: 'Difficult-to-explain landscape proposals, limited client confidence before build, and presentations that do not communicate spatial quality.',
    contactCta: 'Request a landscape visualization',
    displayOrder: 6,
    deliverables: items([
      ['Landscape visualization', 'Scene-based views that communicate outdoor character and layout.'],
      ['Garden concepts', 'Planting and material ideas presented as a coherent concept.'],
      ['Outdoor-space planning', 'Circulation, seating, planting, and built-element arrangement.'],
      ['3D modelling', 'Accurate models of terrain, planting masses, and structures.'],
      ['Architectural visualization', 'Context views that relate landscape to buildings.'],
      ['Presentation renders', 'Still images prepared for client review and proposals.'],
    ]),
    processSteps: items([
      ['Brief', 'Collect site photos, drawings, and design intent.'],
      ['Concept', 'Propose layout, planting character, and material direction.'],
      ['Model', 'Build the 3D environment and camera views.'],
      ['Visualize', 'Produce renders that communicate light, space, and planting.'],
      ['Present', 'Deliver images and notes for client or consultant review.'],
    ]),
    faqs: faqs([
      ['Do you provide construction drawings?', 'This service focuses on visualization and concept communication rather than construction documentation.'],
      ['What do you need to start?', 'Site photographs, any available drawings, and a short description of the intended use.'],
      ['Can you visualize an existing garden redesign?', 'Yes. Existing conditions can be modelled and compared with a proposed direction.'],
    ]),
  },
};

const PROJECTS = [
  {
    id: 'scopilot',
    title: 'Scopilot – Freelancer Scope Management Platform',
    slug: 'scopilot-freelancer-scope-management',
    category: 'DEVELOPMENT',
    shortDescription: 'A full-stack platform that helps freelancers evaluate projects, define scope, manage requirement changes, monitor revision limits and reduce scope creep.',
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Laptop showing a project planning dashboard on a wooden desk',
    industry: 'Freelance software',
    projectYear: 2026,
    overview: 'Scopilot is a demonstration portfolio project: a full-stack platform for freelancers who need a clearer way to evaluate incoming work, define scope, and keep requirement changes visible. The product is designed around the practical problem of scope creep rather than around invented growth metrics.',
    challenge: 'Freelancers often accept loosely defined projects, then absorb extra revisions without a shared record of what was agreed. The challenge was to give those conversations a structured home: evaluation, scope, change tracking, and revision limits in one application.',
    approach: 'The work combined product thinking with a conventional full-stack build. The frontend is a React application using Vite and Tailwind CSS. The backend is Java and Spring Boot with PostgreSQL.',
    solution: 'Scopilot provides flows for evaluating a project, capturing scope, recording requirement changes, and monitoring revision limits. The application is a working product example in the NOVIQ portfolio.',
    results: 'This is demonstration portfolio content. No client revenue, conversion, or award figures are claimed.',
    servicesProvided: 'Web application development; product UI; REST API; PostgreSQL persistence; AI-assisted evaluation.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Java', 'Spring Boot', 'PostgreSQL'],
    featured: true,
    demonstration: true,
    displayOrder: 1,
    images: [
      { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80', altText: 'Person working on a laptop with code on screen', caption: 'Product workspace for scope and evaluation flows.' },
      { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80', altText: 'Analytics charts on a laptop display', caption: 'Structured views for tracking project changes.' },
    ],
  },
  {
    id: 'student-api',
    title: 'Student Management CRUD REST API',
    slug: 'student-management-crud-rest-api',
    category: 'DEVELOPMENT',
    shortDescription: 'A REST API providing complete student-management CRUD operations with PostgreSQL persistence and tested HTTP endpoints.',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Code editor with programming work on a dark screen',
    industry: 'Education software',
    projectYear: 2025,
    overview: 'This demonstration portfolio project is a focused backend: a student-management REST API with create, read, update, and delete operations persisted in PostgreSQL.',
    challenge: 'Student records needed a clear API contract, validation, and durable storage without mixing UI concerns into the service.',
    approach: 'The API was implemented with Java, Spring Boot, Spring Data JPA, and Maven. PostgreSQL stores the records.',
    solution: 'The result is a complete CRUD API with PostgreSQL persistence and tested HTTP endpoints.',
    results: 'This is demonstration portfolio content. No institutional deployment statistics are claimed.',
    servicesProvided: 'REST API development; Spring Boot backend; PostgreSQL integration.',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Maven'],
    featured: true,
    demonstration: true,
    displayOrder: 2,
    images: [
      { id: 'a1', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80', altText: 'Java code in a text editor', caption: 'REST endpoints implemented with Spring Boot.' },
    ],
  },
  {
    id: 'lead-automation',
    title: 'Freelance Lead Qualification and Email Automation',
    slug: 'freelance-lead-qualification-email-automation',
    category: 'AUTOMATION',
    shortDescription: 'An automation workflow that evaluates freelance leads using budget and deadline conditions and sends the appropriate email response automatically.',
    coverImageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Notebook, pen and planner representing an organized operations workflow',
    industry: 'Freelance operations',
    projectYear: 2025,
    overview: 'This demonstration portfolio project is an n8n workflow for freelance lead handling. Incoming leads are evaluated against budget and deadline conditions.',
    challenge: 'Manual qualification slows response time and makes it easy to miss a lead that should receive a different reply depending on budget or timing.',
    approach: 'The workflow was designed around explicit conditions rather than hidden logic. n8n orchestrates the steps, Google Sheets stores a working log, and Gmail sends the corresponding message.',
    solution: 'Leads are qualified by budget and deadline rules, then receive the appropriate automated email.',
    results: 'This is demonstration portfolio content. No lead-volume or conversion statistics are claimed.',
    servicesProvided: 'Business automation; n8n workflows; email automation; Google Workspace integration.',
    technologies: ['n8n', 'Google Sheets', 'Gmail', 'Workflow Automation'],
    featured: true,
    demonstration: true,
    displayOrder: 3,
    images: [
      { id: 'l1', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80', altText: 'People collaborating around laptops', caption: 'Lead qualification rules before the email step.' },
    ],
  },
  {
    id: 'clinic-analysis',
    title: 'Clinic Appointment Process Analysis',
    slug: 'clinic-appointment-process-analysis',
    category: 'BUSINESS_ANALYSIS',
    shortDescription: 'A business analysis case study focused on understanding a manual clinic appointment process, identifying operational gaps, documenting requirements, and defining a clearer digital appointment workflow.',
    coverImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    coverImageAlt: 'Notebook and process notes representing a clinic operations review',
    industry: 'Clinic operations',
    projectYear: 2026,
    overview: 'This is a demonstration portfolio case study. It is not a real client engagement.\n\nThe work examines a small clinic that books appointments by phone and paper diary. The analysis documents the current process, names the people involved, and turns the findings into requirements for a clearer digital workflow.',
    challenge: 'Appointments were recorded in a paper diary and confirmed by phone. The same slot could be promised twice, cancellations were easy to miss, and there was no shared record of why a booking changed.',
    approach: 'The as-is process was mapped from first contact to the completed visit. Gaps appeared at confirmation, cancellation, and hand-off to the clinician. Those problems were written as requirements rather than as a vendor shortlist.',
    solution: 'The proposed solution is a shared appointment record with a single source of booked times, confirmation and cancellation steps, a daily list for each clinician, and a simple way to record the reason for a change.',
    results: 'Expected improvements are qualitative: fewer unclear bookings, a shared view of the day, and a documented process a developer or automation specialist can implement. This remains demonstration portfolio content.',
    servicesProvided: 'Business analysis; as-is and to-be process mapping; requirements documentation; user stories; acceptance criteria.',
    technologies: ['Requirements documentation', 'Process mapping'],
    featured: true,
    demonstration: true,
    displayOrder: 4,
    images: [
      { id: 'c1', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80', altText: 'Person reviewing documents and notes at a desk', caption: 'As-is process notes before the to-be workflow was defined.' },
    ],
  },
];

function withRelated(service) {
  const categoryMap = {
    'logo-design-brand-identity': 'BRANDING',
    'ui-ux-design': 'UI_UX',
    'web-application-development': 'DEVELOPMENT',
    'business-automation': 'AUTOMATION',
    'business-analysis': 'BUSINESS_ANALYSIS',
    '3d-landscape-design': 'LANDSCAPE',
  };
  const category = categoryMap[service.slug];
  return {
    ...service,
    relatedProjects: PROJECTS.filter((project) => project.category === category).slice(0, 3),
  };
}

function withNeighbors(project) {
  const ordered = [...PROJECTS].sort((a, b) => a.displayOrder - b.displayOrder);
  const index = ordered.findIndex((item) => item.slug === project.slug);
  return {
    ...project,
    previousProject: index > 0 ? { slug: ordered[index - 1].slug, title: ordered[index - 1].title } : null,
    nextProject: index < ordered.length - 1 ? { slug: ordered[index + 1].slug, title: ordered[index + 1].title } : null,
  };
}

export function getCatalogSettings() {
  return {
    heroHeading: 'We understand businesses, design identities, build digital products, and automate what matters.',
    heroSupportingText: 'NOVIQ combines business analysis, strategic design, software development, automation, and 3D visualization to turn business needs into purposeful solutions.',
    footerDescription: 'NOVIQ Studio & Solutions analyzes business needs, designs brands, builds digital products, automates processes, and visualizes spaces.',
    defaultSeoDescription: 'NOVIQ Studio & Solutions is a multidisciplinary digital agency for business analysis, brand identity, UI/UX, web application development, business automation, and 3D landscape design.',
    primaryEmail: 'hello@noviq.studio',
    phone: null,
    location: 'Sri Lanka',
  };
}

export function getCatalogServices() {
  return Object.values(SERVICE_DETAILS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((service) => ({
      id: service.slug,
      title: service.title,
      slug: service.slug,
      capabilityGroup: service.capabilityGroup,
      shortDescription: service.shortDescription,
      contactCta: service.contactCta,
      displayOrder: service.displayOrder,
    }));
}

export function getCatalogService(slug) {
  const service = SERVICE_DETAILS[slug];
  return service ? withRelated(service) : null;
}

export function getCatalogProjectPage({ page = 0, size = 9, category } = {}) {
  const filtered = category ? PROJECTS.filter((project) => project.category === category) : PROJECTS;
  const start = page * size;
  const content = filtered.slice(start, start + size);
  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  return {
    content,
    page,
    size,
    totalElements: filtered.length,
    totalPages,
    first: page === 0,
    last: page >= totalPages - 1,
  };
}

export function getCatalogFeaturedProjects() {
  return PROJECTS.filter((project) => project.featured);
}

export function getCatalogProject(slug) {
  const project = PROJECTS.find((item) => item.slug === slug);
  return project ? withNeighbors(project) : null;
}

export function getCatalogTestimonials() {
  return [];
}

export function getCatalogTeam() {
  return [];
}
