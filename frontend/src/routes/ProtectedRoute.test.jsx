import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';

vi.mock('../features/auth/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: false, loading: false }),
}));

describe('Protected routes', () => {
  it('redirects unauthenticated users to admin login', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin/login" element={<p>Login page</p>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <p>Dashboard secret</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard secret')).not.toBeInTheDocument();
  });
});
