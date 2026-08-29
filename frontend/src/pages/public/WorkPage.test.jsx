import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WorkPage from './WorkPage';

vi.mock('../../api/public', () => ({
  publicApi: {
    getProjects: vi.fn((params) => {
      const items = [
        { id: '1', title: 'Scopilot', slug: 'scopilot', category: 'DEVELOPMENT', shortDescription: 'Scope tool', technologies: ['React'] },
        { id: '2', title: 'Lead Automation', slug: 'lead-automation', category: 'AUTOMATION', shortDescription: 'Lead workflow', technologies: ['n8n'] },
        { id: '3', title: 'Clinic Appointment Process Analysis', slug: 'clinic-appointment-process-analysis', category: 'BUSINESS_ANALYSIS', shortDescription: 'Clinic process study', technologies: ['Process mapping'] },
      ];
      const filtered = params.category ? items.filter((item) => item.category === params.category) : items;
      return Promise.resolve({ content: filtered, page: 0, size: 9, totalElements: filtered.length, totalPages: 1, first: true, last: true });
    }),
  },
}));

function renderWork() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <HelmetProvider>
          <WorkPage />
        </HelmetProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Project filters', () => {
  it('filters the work list by category', async () => {
    const user = userEvent.setup();
    renderWork();
    expect(await screen.findByText('Scopilot')).toBeInTheDocument();
    expect(screen.getByText('Lead Automation')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Automation' }));
    expect(await screen.findByText('Lead Automation')).toBeInTheDocument();
    expect(screen.queryByText('Scopilot')).not.toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Business Analysis' }));
    expect(await screen.findByText('Clinic Appointment Process Analysis')).toBeInTheDocument();
    expect(screen.queryByText('Lead Automation')).not.toBeInTheDocument();
  });
});
