import { buildProjectListParams, normalizeProjectPage } from './admin';

describe('buildProjectListParams', () => {
  it('omits empty search, category, and status filters', () => {
    expect(buildProjectListParams({ page: 0, size: 10, search: '  ', category: '', status: 'ALL' })).toEqual({
      page: 0,
      size: 10,
    });
  });

  it('includes only filters that have real values', () => {
    expect(buildProjectListParams({
      page: 1,
      size: 10,
      search: ' student ',
      category: 'DEVELOPMENT',
      status: 'PUBLISHED',
    })).toEqual({
      page: 1,
      size: 10,
      search: 'student',
      category: 'DEVELOPMENT',
      status: 'PUBLISHED',
    });
  });
});

describe('normalizeProjectPage', () => {
  it('reads Spring Data page content instead of treating the page object as rows', () => {
    const page = normalizeProjectPage({
      content: [
        { id: '1', title: 'Scopilot' },
        { id: '2', title: 'Student CRUD API' },
        { id: '3', title: 'n8n lead automation' },
      ],
      totalElements: 3,
      totalPages: 1,
      number: 0,
      size: 10,
      first: true,
      last: true,
    });

    expect(page.items).toHaveLength(3);
    expect(page.totalElements).toBe(3);
    expect(page.page).toBe(0);
    expect(page.size).toBe(10);
  });

  it('rejects a non-page payload instead of rendering an empty table', () => {
    expect(() => normalizeProjectPage({ totalElements: 3 })).toThrow(/could not be loaded/i);
  });
});
