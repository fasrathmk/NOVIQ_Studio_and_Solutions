ALTER TABLE projects DROP CONSTRAINT ck_projects_category;
ALTER TABLE projects ADD CONSTRAINT ck_projects_category CHECK (
    category IN ('BRANDING', 'UI_UX', 'DEVELOPMENT', 'AUTOMATION', 'BUSINESS_ANALYSIS', 'LANDSCAPE')
);

UPDATE site_settings
SET hero_heading = 'We understand businesses, design identities, build digital products, and automate what matters.',
    hero_supporting_text = 'NOVIQ combines business analysis, strategic design, software development, automation, and 3D visualization to turn business needs into purposeful solutions.',
    footer_description = 'NOVIQ Studio & Solutions analyzes business needs, designs brands, builds digital products, automates processes, and visualizes spaces.',
    default_seo_description = 'NOVIQ Studio & Solutions is a multidisciplinary digital agency for business analysis, brand identity, UI/UX, web application development, business automation, and 3D landscape design.',
    updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE services
SET display_order = 6
WHERE slug = '3d-landscape-design';

INSERT INTO services (
    id, title, slug, capability_group, short_description, full_description, problems_solved, contact_cta, active, display_order, is_protected
) VALUES (
    '66666666-6666-6666-6666-666666666666',
    'Business Analysis',
    'business-analysis',
    'TECHNOLOGY',
    'Turning business needs into clear requirements, practical processes, and actionable solutions.',
    'NOVIQ helps businesses understand their current challenges, define clear requirements, improve processes, and translate business needs into practical digital solutions.

The work sits between the people who know the operation and the people who will design or build a change. We document how work happens today, agree what should change, and produce requirements that a team can implement without guessing.',
    'Unclear business requirements, inefficient manual processes, communication gaps between business and technical teams, poorly defined software requirements, repetitive business processes, lack of process documentation, unclear project scope, and difficulty identifying automation opportunities.',
    'Discuss Your Business',
    TRUE, 5, TRUE
);

INSERT INTO service_deliverables (id, service_id, title, description, display_order) VALUES
('66666666-0001-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'Business Requirements Document (BRD)', 'A shared statement of business needs, scope, and expected outcomes.', 1),
('66666666-0001-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 'Software Requirements Specification (SRS)', 'A structured specification that development teams can implement against.', 2),
('66666666-0001-0000-0000-000000000003', '66666666-6666-6666-6666-666666666666', 'Functional Requirements', 'What the process or system must do, written in plain language.', 3),
('66666666-0001-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'User Stories', 'Work items framed around the person who needs a result.', 4),
('66666666-0001-0000-0000-000000000005', '66666666-6666-6666-6666-666666666666', 'Acceptance Criteria', 'Clear conditions that show when a requirement is complete.', 5),
('66666666-0001-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 'Use Cases', 'Step-by-step interactions between people, systems, and outcomes.', 6),
('66666666-0001-0000-0000-000000000007', '66666666-6666-6666-6666-666666666666', 'Process Flow Diagrams', 'Visual maps of the current or proposed workflow.', 7),
('66666666-0001-0000-0000-000000000008', '66666666-6666-6666-6666-666666666666', 'As-Is / To-Be Process Analysis', 'A comparison of how work happens now and how it should happen next.', 8),
('66666666-0001-0000-0000-000000000009', '66666666-6666-6666-6666-666666666666', 'Gap Analysis', 'The differences between current capability and the required outcome.', 9),
('66666666-0001-0000-0000-000000000010', '66666666-6666-6666-6666-666666666666', 'Stakeholder Analysis', 'Who is involved, what they need, and how they influence the work.', 10),
('66666666-0001-0000-0000-000000000011', '66666666-6666-6666-6666-666666666666', 'Business Process Documentation', 'A written record teams can use after the analysis is finished.', 11),
('66666666-0001-0000-0000-000000000012', '66666666-6666-6666-6666-666666666666', 'Requirement Traceability Matrix', 'A map from each requirement to its source, owner, and later work.', 12),
('66666666-0001-0000-0000-000000000013', '66666666-6666-6666-6666-666666666666', 'Project Scope Definition', 'What is included, what is excluded, and what would change the brief.', 13),
('66666666-0001-0000-0000-000000000014', '66666666-6666-6666-6666-666666666666', 'Automation Opportunity Analysis', 'A practical review of which repetitive steps are worth automating.', 14);

INSERT INTO service_process_steps (id, service_id, title, description, display_order) VALUES
('66666666-0002-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'Discover', 'Listen to the business, gather context, and identify the people involved.', 1),
('66666666-0002-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 'Understand', 'Clarify goals, constraints, and how work currently happens.', 2),
('66666666-0002-0000-0000-000000000003', '66666666-6666-6666-6666-666666666666', 'Analyze', 'Map gaps, friction, and where a clearer process or system would help.', 3),
('66666666-0002-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'Document', 'Write requirements, flows, and scope in a form teams can use.', 4),
('66666666-0002-0000-0000-000000000005', '66666666-6666-6666-6666-666666666666', 'Validate', 'Review the documents with stakeholders and correct misunderstandings.', 5),
('66666666-0002-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 'Recommend', 'Propose a practical next step: process change, automation, or software.', 6);

INSERT INTO service_faqs (id, service_id, question, answer, display_order) VALUES
('66666666-0003-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'What does a business analyst do?', 'A business analyst clarifies how work happens today, what needs to change, and what a solution must do. At NOVIQ that usually means interviews, process maps, requirements, and a written recommendation the design or development team can use.', 1),
('66666666-0003-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 'When does a business need business analysis?', 'It is useful when a process is unclear, when software is about to be built or changed, or when teams disagree about scope. Analysis is also useful before automation, so the workflow is understood before it is connected.', 2),
('66666666-0003-0000-0000-000000000003', '66666666-6666-6666-6666-666666666666', 'Can NOVIQ analyze an existing business process?', 'Yes. Existing processes can be documented as they are, then compared with a proposed to-be process. The aim is a clearer picture, not a claim that every process must be replaced.', 3),
('66666666-0003-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'Can Business Analysis be combined with automation?', 'Yes. Analysis often comes first so the automation is based on a documented process rather than an assumed one. The same work can also lead into software development when a new product is the better fit.', 4),
('66666666-0003-0000-0000-000000000005', '66666666-6666-6666-6666-666666666666', 'Can NOVIQ create software requirements before development?', 'Yes. Requirements, user stories, and acceptance criteria can be prepared before implementation so the build starts from an agreed brief.', 5),
('66666666-0003-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 'What documents will we receive?', 'Delivery depends on the brief. Typical packages include a BRD or SRS, process flows, user stories with acceptance criteria, and a written scope. We agree the document set before the work starts.', 6);

INSERT INTO technologies (id, name) VALUES
('10000000-0000-0000-0000-000000000019', 'Requirements documentation'),
('10000000-0000-0000-0000-000000000020', 'Process mapping');

INSERT INTO projects (
    id, title, slug, client_name, industry, project_year, category, short_description,
    cover_image_url, cover_image_alt, overview, challenge, approach, solution, results, services_provided,
    live_url, behance_url, github_url, featured, display_order, status, demonstration
) VALUES (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Clinic Appointment Process Analysis',
    'clinic-appointment-process-analysis',
    NULL,
    'Clinic operations',
    2026,
    'BUSINESS_ANALYSIS',
    'A business analysis case study focused on understanding a manual clinic appointment process, identifying operational gaps, documenting requirements, and defining a clearer digital appointment workflow.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    'Notebook and process notes representing a clinic operations review',
    'This is a demonstration portfolio case study. It is not a real client engagement.

The work examines a small clinic that books appointments by phone and paper diary. Reception, clinicians, and patients each see a different version of availability. The analysis documents the current process, names the people involved, and turns the findings into requirements for a clearer digital workflow.

Stakeholders:
- Reception staff who take calls and write bookings
- Clinicians who need a reliable daily list
- Patients who want a confirmed time
- A clinic manager who needs fewer double-bookings',
    'Appointments were recorded in a paper diary and confirmed by phone. The same slot could be promised twice, cancellations were easy to miss, and there was no shared record of why a booking changed. The clinic wanted a clearer process before considering software, not a product chosen in advance.',
    'The as-is process was mapped from first contact to the completed visit: call, diary entry, reminder, arrival, and follow-up. Gaps appeared at confirmation, cancellation, and hand-off to the clinician. Those problems were written as requirements rather than as a vendor shortlist. The to-be process keeps human review for unusual cases and proposes a shared appointment record for routine bookings.',
    'The proposed solution is a shared appointment record with:
- A single source of booked times
- Confirmation and cancellation steps
- A daily list for each clinician
- A simple way to record the reason for a change

Functional requirements include creating, confirming, rescheduling, and cancelling an appointment, and viewing the day list. Example user stories:
- As reception, I can book a slot so the clinician sees it immediately.
- As a patient, I receive a confirmation I can keep.
- As a clinician, I can see today''s list without checking the paper diary.

Acceptance criteria were written for each story so a later build can be checked without inventing extra scope.',
    'Expected improvements are qualitative: fewer unclear bookings, a shared view of the day, and a documented process a developer or automation specialist can implement. This remains demonstration portfolio content. No patient numbers, revenue figures, or clinic names are claimed.',
    'Business analysis; as-is and to-be process mapping; requirements documentation; user stories; acceptance criteria.',
    NULL, NULL, NULL, TRUE, 4, 'PUBLISHED', TRUE
);

INSERT INTO project_technologies (project_id, technology_id) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', '10000000-0000-0000-0000-000000000019'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '10000000-0000-0000-0000-000000000020');

INSERT INTO project_images (id, project_id, image_url, alt_text, caption, display_order) VALUES
('dddddddd-0001-0000-0000-000000000001', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
 'Person reviewing documents and notes at a desk', 'As-is process notes before the to-be workflow was defined.', 1),
('dddddddd-0001-0000-0000-000000000002', 'dddddddd-dddd-dddd-dddd-dddddddddddd',
 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80',
 'Planner and pen used to structure a workflow', 'Requirements written as stories and acceptance criteria.', 2);
