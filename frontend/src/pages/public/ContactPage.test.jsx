import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ContactPage from './ContactPage';
import { ToastProvider } from '../../components/common/Toast';

vi.mock('../../api/public', () => ({
  publicApi: {
    getServices: vi.fn().mockResolvedValue([
      { slug: 'web-application-development', title: 'Web Application Development' },
    ]),
  },
}));

vi.mock('../../api/web3forms', () => ({
  submitInquiry: vi.fn(),
}));

function renderContact() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <HelmetProvider>
          <ToastProvider>
            <ContactPage />
          </ToastProvider>
        </HelmetProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Contact form validation', () => {
  it('requires a project description and consent', async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/please describe the project/i)).toBeInTheDocument();
    expect(screen.getByText(/consent is required/i)).toBeInTheDocument();
  });
});
