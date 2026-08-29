import api, { isPublicApiEnabled } from './client';
import {
  getCatalogFeaturedProjects,
  getCatalogProject,
  getCatalogProjectPage,
  getCatalogService,
  getCatalogServices,
  getCatalogSettings,
  getCatalogTeam,
  getCatalogTestimonials,
} from '../data/publicCatalog';

async function fromApiOrCatalog(request, fallback) {
  if (!isPublicApiEnabled()) {
    return fallback();
  }
  try {
    return await request();
  } catch {
    return fallback();
  }
}

export const publicApi = {
  getSettings: () => fromApiOrCatalog(
    () => api.get('/public/settings').then((res) => res.data),
    getCatalogSettings,
  ),
  getServices: () => fromApiOrCatalog(
    () => api.get('/public/services').then((res) => res.data),
    getCatalogServices,
  ),
  getService: (slug) => fromApiOrCatalog(
    () => api.get(`/public/services/${slug}`).then((res) => res.data),
    () => {
      const service = getCatalogService(slug);
      if (!service) {
        throw new Error('Service not found.');
      }
      return service;
    },
  ),
  getProjects: (params) => fromApiOrCatalog(
    () => api.get('/public/projects', { params }).then((res) => res.data),
    () => getCatalogProjectPage(params),
  ),
  getFeaturedProjects: () => fromApiOrCatalog(
    () => api.get('/public/projects/featured').then((res) => res.data),
    getCatalogFeaturedProjects,
  ),
  getProject: (slug) => fromApiOrCatalog(
    () => api.get(`/public/projects/${slug}`).then((res) => res.data),
    () => {
      const project = getCatalogProject(slug);
      if (!project) {
        throw new Error('Project not found.');
      }
      return project;
    },
  ),
  getTestimonials: () => fromApiOrCatalog(
    () => api.get('/public/testimonials').then((res) => res.data),
    getCatalogTestimonials,
  ),
  getTeam: () => fromApiOrCatalog(
    () => api.get('/public/team').then((res) => res.data),
    getCatalogTeam,
  ),
  createInquiry: (payload) => api.post('/public/inquiries', payload).then((res) => res.data),
};
