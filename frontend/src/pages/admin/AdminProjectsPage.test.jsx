import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminProjectsPage from './AdminProjectsPage';
import { ToastProvider } from '../../components/common/Toast';
import { adminApi } from '../../api/admin';

vi.mock('../../api/admin', async () => {
  const actual = await vi.importActual('../../api/admin');
  return {
    ...actual,
    adminApi: {
      listProjects: vi.fn(),
      deleteProject: vi.fn(),
      updateProjectStatus: vi.fn(),
      updateProjectFeatured: vi.fn(),
    },
  };
});

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <ToastProvider>
          <AdminProjectsPage />
        </ToastProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Admin projects page', () => {
  it('renders one row for each project in the normalized page', async () => {
    adminApi.listProjects.mockResolvedValue({
      items: [
        { id: '1', title: 'Scopilot', category: 'DEVELOPMENT', status: 'PUBLISHED', featured: true },
        { id: '2', title: 'Student CRUD API', category: 'DEVELOPMENT', status: 'PUBLISHED', featured: false },
        { id: '3', title: 'n8n lead automation', category: 'AUTOMATION', status: 'PUBLISHED', featured: false },
      ],
      totalElements: 3,
      totalPages: 1,
      page: 0,
      size: 10,
      first: true,
      last: true,
    });

    renderPage();

    expect((await screen.findAllByText('Scopilot')).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Student CRUD API').length).toBeGreaterThan(0);
    expect(screen.getAllByText('n8n lead automation').length).toBeGreaterThan(0);
    expect(screen.queryByText('No projects found. Create your first project.')).not.toBeInTheDocument();
  });

  it('shows an error instead of the empty state when the request fails', async () => {
    adminApi.listProjects.mockRejectedValue(new Error('boom'));
    renderPage();
    expect(await screen.findByText('Projects could not be loaded. Please try again.')).toBeInTheDocument();
    expect(screen.queryByText('No projects found. Create your first project.')).not.toBeInTheDocument();
  });

  it('shows the empty state only after a successful empty response', async () => {
    adminApi.listProjects.mockResolvedValue({
      items: [],
      totalElements: 0,
      totalPages: 0,
      page: 0,
      size: 10,
      first: true,
      last: true,
    });
    renderPage();
    expect(await screen.findByText('No projects found. Create your first project.')).toBeInTheDocument();
    expect(screen.queryByText('Projects could not be loaded. Please try again.')).not.toBeInTheDocument();
  });
});
