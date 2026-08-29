import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FolderKanban, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, Sparkles, Users, X, Quote } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import Logo from '../components/common/Logo';

const LINKS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const title = LINKS.find((link) => (link.end ? location.pathname === link.to : location.pathname.startsWith(link.to)))?.label || 'Dashboard';

  async function handleLogout() {
    await logout();
    navigate('/admin/login');
  }

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-noviq text-white' : 'text-cream-200 hover:bg-white/10'}`
            }
          >
            <Icon size={18} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-cream-100 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="hidden bg-ink p-5 text-cream-100 lg:flex lg:flex-col">
        <Link to="/admin" className="inline-flex w-full max-w-[200px]">
          <Logo
            variant="light"
            className="block h-auto w-full object-contain"
            alt="NOVIQ Studio & Solutions"
          />
        </Link>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-noviq-light">Admin</p>
        <div className="mt-8 flex-1">{nav}</div>
        <Link to="/" className="text-sm text-cream-300 hover:text-white">View website</Link>
      </aside>
      <div>
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cream-300 bg-cream-50 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" className="btn-ghost lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Dashboard</p>
              <h1 className="font-display text-xl">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-ink-muted sm:block">{admin?.fullName || admin?.email}</span>
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>
        {open ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close menu" onClick={() => setOpen(false)} />
            <aside className="relative h-full w-72 bg-ink p-5 text-cream-100">
              <div className="mb-6 flex items-start justify-between gap-3">
                <Link to="/admin" className="inline-flex min-w-0 flex-1 max-w-[200px]" onClick={() => setOpen(false)}>
                  <Logo
                    variant="light"
                    className="block h-auto w-full object-contain"
                    alt="NOVIQ Studio & Solutions"
                  />
                </Link>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X />
                </button>
              </div>
              {nav}
            </aside>
          </div>
        ) : null}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
