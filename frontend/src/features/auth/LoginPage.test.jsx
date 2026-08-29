import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoginPage from '../../pages/admin/LoginPage';
import { AuthProvider } from './AuthContext';

vi.mock('../../api/admin', () => ({
  authApi: {
    login: vi.fn(),
    logout: vi.fn(),
    me: vi.fn(),
  },
}));

function renderLogin() {
  render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>,
  );
}

describe('Login form validation', () => {
  it('shows validation messages for empty fields', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });
});
