import { ClipboardList, Code2, Layout, Palette, Trees, Workflow } from 'lucide-react';

const SERVICE_VISUALS = {
  'logo-design-brand-identity': {
    icon: Palette,
    accent: 'text-service-branding',
    surface: 'bg-service-branding/10',
  },
  'ui-ux-design': {
    icon: Layout,
    accent: 'text-service-uiux',
    surface: 'bg-service-uiux/10',
  },
  'web-application-development': {
    icon: Code2,
    accent: 'text-service-development',
    surface: 'bg-service-development/10',
  },
  'business-automation': {
    icon: Workflow,
    accent: 'text-service-automation',
    surface: 'bg-service-automation/10',
  },
  'business-analysis': {
    icon: ClipboardList,
    accent: 'text-service-analysis',
    surface: 'bg-service-analysis/10',
  },
  '3d-landscape-design': {
    icon: Trees,
    accent: 'text-service-landscape',
    surface: 'bg-service-landscape/10',
  },
};

const FALLBACK = {
  icon: ClipboardList,
  accent: 'text-noviq',
  surface: 'bg-noviq-light',
};

export function getServiceVisual(slug) {
  return SERVICE_VISUALS[slug] || FALLBACK;
}
