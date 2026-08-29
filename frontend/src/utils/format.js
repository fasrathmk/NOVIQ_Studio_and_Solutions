import { BUDGET_OPTIONS, CATEGORY_LABELS } from './constants';

export function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category || '';
}

export function budgetLabel(value) {
  return BUDGET_OPTIONS.find((item) => item.value === value)?.label || value;
}

export function serviceLabel(slug) {
  const labels = {
    'logo-design-brand-identity': 'Logo Design & Brand Identity',
    'ui-ux-design': 'UI/UX Design',
    'web-application-development': 'Web Application Development',
    'business-automation': 'Business Automation',
    'business-analysis': 'Business Analysis',
    '3d-landscape-design': '3D Landscape Design',
  };
  return labels[slug] || slug;
}

export function capabilityLabel(group) {
  const labels = { DESIGN: 'Design', TECHNOLOGY: 'Technology', VISUALIZATION: 'Visualization' };
  return labels[group] || group;
}

export function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function siteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured && !(import.meta.env.PROD && configured.includes('localhost'))) {
    return configured.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return configured?.replace(/\/$/, '') || 'http://localhost:5173';
}
