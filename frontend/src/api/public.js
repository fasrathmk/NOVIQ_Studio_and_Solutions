import api from './client';

export const publicApi = {
  getSettings: () => api.get('/public/settings').then((res) => res.data),
  getServices: () => api.get('/public/services').then((res) => res.data),
  getService: (slug) => api.get(`/public/services/${slug}`).then((res) => res.data),
  getProjects: (params) => api.get('/public/projects', { params }).then((res) => res.data),
  getFeaturedProjects: () => api.get('/public/projects/featured').then((res) => res.data),
  getProject: (slug) => api.get(`/public/projects/${slug}`).then((res) => res.data),
  getTestimonials: () => api.get('/public/testimonials').then((res) => res.data),
  getTeam: () => api.get('/public/team').then((res) => res.data),
  createInquiry: (payload) => api.post('/public/inquiries', payload).then((res) => res.data),
};
