import api from './client';

export const authApi = {
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
  me: () => api.get('/auth/me').then((res) => res.data),
};

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard/stats').then((res) => res.data),
  listProjects: (filters) => api.get('/admin/projects', { params: buildProjectListParams(filters) }).then((res) => normalizeProjectPage(res.data)),
  getProject: (id) => api.get(`/admin/projects/${id}`).then((res) => res.data),
  createProject: (payload) => api.post('/admin/projects', payload).then((res) => res.data),
  updateProject: (id, payload) => api.put(`/admin/projects/${id}`, payload).then((res) => res.data),
  updateProjectStatus: (id, status) => api.patch(`/admin/projects/${id}/status`, { status }).then((res) => res.data),
  updateProjectFeatured: (id, featured) => api.patch(`/admin/projects/${id}/featured`, { featured }).then((res) => res.data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  addProjectImage: (id, payload) => api.post(`/admin/projects/${id}/images`, payload).then((res) => res.data),
  updateProjectImage: (id, imageId, payload) => api.put(`/admin/projects/${id}/images/${imageId}`, payload).then((res) => res.data),
  deleteProjectImage: (id, imageId) => api.delete(`/admin/projects/${id}/images/${imageId}`),
  reorderProjectImages: (id, ids) => api.put(`/admin/projects/${id}/images/reorder`, { ids }).then((res) => res.data),
  listTechnologies: () => api.get('/admin/technologies').then((res) => res.data),
  createTechnology: (payload) => api.post('/admin/technologies', payload).then((res) => res.data),
  deleteTechnology: (id) => api.delete(`/admin/technologies/${id}`),
  listServices: () => api.get('/admin/services').then((res) => res.data),
  getService: (id) => api.get(`/admin/services/${id}`).then((res) => res.data),
  createService: (payload) => api.post('/admin/services', payload).then((res) => res.data),
  updateService: (id, payload) => api.put(`/admin/services/${id}`, payload).then((res) => res.data),
  setServiceActive: (id, active) => api.patch(`/admin/services/${id}/active`, { active }).then((res) => res.data),
  reorderServices: (ids) => api.put('/admin/services/reorder', { ids }),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  listTestimonials: () => api.get('/admin/testimonials').then((res) => res.data),
  getTestimonial: (id) => api.get(`/admin/testimonials/${id}`).then((res) => res.data),
  createTestimonial: (payload) => api.post('/admin/testimonials', payload).then((res) => res.data),
  updateTestimonial: (id, payload) => api.put(`/admin/testimonials/${id}`, payload).then((res) => res.data),
  setTestimonialApproval: (id, approved) => api.patch(`/admin/testimonials/${id}/approval`, { approved }).then((res) => res.data),
  reorderTestimonials: (ids) => api.put('/admin/testimonials/reorder', { ids }),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
  listTeam: () => api.get('/admin/team').then((res) => res.data),
  getTeamMember: (id) => api.get(`/admin/team/${id}`).then((res) => res.data),
  createTeamMember: (payload) => api.post('/admin/team', payload).then((res) => res.data),
  updateTeamMember: (id, payload) => api.put(`/admin/team/${id}`, payload).then((res) => res.data),
  setTeamActive: (id, active) => api.patch(`/admin/team/${id}/active`, { active }).then((res) => res.data),
  reorderTeam: (ids) => api.put('/admin/team/reorder', { ids }),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}`),
  listInquiries: (params) => api.get('/admin/inquiries', { params }).then((res) => res.data),
  getInquiry: (id) => api.get(`/admin/inquiries/${id}`).then((res) => res.data),
  updateInquiryStatus: (id, status) => api.patch(`/admin/inquiries/${id}/status`, { status }).then((res) => res.data),
  updateInquiryNote: (id, internalNote) => api.patch(`/admin/inquiries/${id}/note`, { internalNote }).then((res) => res.data),
  archiveInquiry: (id) => api.post(`/admin/inquiries/${id}/archive`).then((res) => res.data),
  spamInquiry: (id) => api.post(`/admin/inquiries/${id}/spam`).then((res) => res.data),
  deleteInquiry: (id) => api.delete(`/admin/inquiries/${id}`),
  getSettings: () => api.get('/admin/settings').then((res) => res.data),
  updateSettings: (payload) => api.put('/admin/settings', payload).then((res) => res.data),
};

export function buildProjectListParams({ page = 0, size = 10, search, category, status } = {}) {
  const params = { page, size };
  if (search?.trim()) {
    params.search = search.trim();
  }
  if (category && category !== 'ALL') {
    params.category = category;
  }
  if (status && status !== 'ALL') {
    params.status = status;
  }
  return params;
}

export function normalizeProjectPage(data) {
  if (Array.isArray(data)) {
    return {
      items: data,
      totalElements: data.length,
      totalPages: 1,
      page: 0,
      size: data.length,
      first: true,
      last: true,
    };
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Projects could not be loaded. Please try again.');
  }
  const items = Array.isArray(data.content)
    ? data.content
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.projects)
        ? data.projects
        : null;
  if (!items) {
    throw new Error('Projects could not be loaded. Please try again.');
  }
  const page = data.page ?? data.number ?? 0;
  const totalPages = data.totalPages ?? 1;
  return {
    items,
    totalElements: data.totalElements ?? items.length,
    totalPages,
    page,
    size: data.size ?? 10,
    first: data.first ?? page === 0,
    last: data.last ?? page >= totalPages - 1,
  };
}
