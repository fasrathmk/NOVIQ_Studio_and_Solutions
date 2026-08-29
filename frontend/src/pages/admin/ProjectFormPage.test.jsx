import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectFormPage from './ProjectFormPage';
import { ToastProvider } from '../../components/common/Toast';

vi.mock('../../api/admin', () => ({
  adminApi: {
    getProject: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
  },
}));

describe('Admin project form validation', () => {
  it('requires a title and short description', async () => {
    const user = userEvent.setup();
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <ToastProvider>
            <ProjectFormPage />
          </ToastProvider>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole('button', { name: /save project/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/short description is required/i)).toBeInTheDocument();
  });
});
