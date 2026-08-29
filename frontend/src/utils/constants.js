export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const PROCESS_STEPS = [
  { number: '01', title: 'Discover', text: 'We listen, review constraints, and clarify the real problem before proposing a direction.' },
  { number: '02', title: 'Plan', text: 'Scope, sequence, and communication are agreed so delivery stays predictable.' },
  { number: '03', title: 'Design', text: 'Structure, identity, and interfaces are resolved with enough detail to implement.' },
  { number: '04', title: 'Build', text: 'Frontend, backend, automation, or visualization work is implemented against the agreed plan.' },
  { number: '05', title: 'Deliver', text: 'The work is reviewed, documented, and handed over in a usable form.' },
  { number: '06', title: 'Support', text: 'After launch we can maintain, improve, and extend what was delivered.' },
];

export const CAPABILITY_GROUPS = [
  {
    key: 'DESIGN',
    title: 'Design',
    text: 'Identity and interface work that gives a business a clear, usable presence.',
    services: ['Logo Design & Brand Identity', 'UI/UX Design'],
  },
  {
    key: 'TECHNOLOGY',
    title: 'Technology',
    text: 'Requirements, web applications, and automation that help teams operate with less friction.',
    services: ['Web Application Development', 'Business Automation', 'Business Analysis'],
  },
  {
    key: 'VISUALIZATION',
    title: 'Visualization',
    text: '3D landscape work that makes outdoor proposals easier to understand.',
    services: ['3D Landscape Design'],
  },
];

export const PROJECT_FILTERS = [
  { value: '', label: 'All' },
  { value: 'BRANDING', label: 'Branding' },
  { value: 'UI_UX', label: 'UI/UX' },
  { value: 'DEVELOPMENT', label: 'Development' },
  { value: 'AUTOMATION', label: 'Automation' },
  { value: 'BUSINESS_ANALYSIS', label: 'Business Analysis' },
  { value: 'LANDSCAPE', label: '3D Landscape' },
];

export const CATEGORY_LABELS = {
  BRANDING: 'Branding',
  UI_UX: 'UI/UX',
  DEVELOPMENT: 'Development',
  AUTOMATION: 'Automation',
  BUSINESS_ANALYSIS: 'Business Analysis',
  LANDSCAPE: '3D Landscape',
};

export const CATEGORY_ACCENTS = {
  BRANDING: 'service-branding',
  UI_UX: 'service-uiux',
  DEVELOPMENT: 'service-development',
  AUTOMATION: 'service-automation',
  BUSINESS_ANALYSIS: 'service-analysis',
  LANDSCAPE: 'service-landscape',
};

export const BUDGET_OPTIONS = [
  { value: 'UNDER_100', label: 'Under $100' },
  { value: 'FROM_100_TO_300', label: '$100–$300' },
  { value: 'FROM_300_TO_750', label: '$300–$750' },
  { value: 'FROM_750_TO_1500', label: '$750–$1,500' },
  { value: 'FROM_1500_PLUS', label: '$1,500+' },
  { value: 'NOT_DECIDED', label: 'Not decided' },
];

export const INQUIRY_STATUSES = [
  'NEW',
  'CONTACTED',
  'IN_DISCUSSION',
  'ACCEPTED',
  'COMPLETED',
  'REJECTED',
  'SPAM',
  'ARCHIVED',
];

export const PROJECT_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export const VALUES = [
  { title: 'Clear communication', text: 'Scope, timelines, and decisions are stated plainly so work can move without guesswork.' },
  { title: 'Purposeful creativity', text: 'Visual and product choices serve the brief rather than decoration for its own sake.' },
  { title: 'Reliable delivery', text: 'Agreed work is finished, documented, and handed over in a form the client can use.' },
  { title: 'Practical innovation', text: 'New tools are used when they reduce effort or improve quality, not because they are fashionable.' },
  { title: 'Continuous improvement', text: 'After launch, products and processes can be refined against real use.' },
];

export const TOOLS = [
  'React',
  'Vite',
  'Tailwind CSS',
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'REST APIs',
  'n8n',
  'Google Workspace',
  'Figma',
  'Requirements documentation',
  '3D visualization',
];
