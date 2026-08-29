import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../../api/admin';
import { getApiBaseUrl } from '../../api/client';

const AuthContext = createContext(null);
const TOKEN_KEY = 'noviq_access_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!token || !getApiBaseUrl()) {
        setAdmin(null);
        setLoading(false);
        return;
      }
      try {
        const profile = await authApi.me();
        if (!cancelled) {
          setAdmin(profile);
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        if (!cancelled) {
          setToken(null);
          setAdmin(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      isAuthenticated: Boolean(token && admin),
      login: (accessToken, profile) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        setToken(accessToken);
        setAdmin(profile);
      },
      logout: async () => {
        if (getApiBaseUrl()) {
          try {
            await authApi.logout();
          } catch {
            // Client-side logout still proceeds if the token has already expired.
          }
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setAdmin(null);
      },
    }),
    [token, admin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
