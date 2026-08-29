import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import Logo from '../common/Logo';

const HEADER_LOGO_CLASS = 'block h-auto w-full object-contain';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-300/80 bg-cream-100/90 backdrop-blur">
      <div className="container-wide flex items-center justify-between gap-4 py-3">
        <Link to="/" className="inline-flex w-[148px] shrink-0 sm:w-[180px] lg:w-[220px]">
          <Logo variant="dark" className={HEADER_LOGO_CLASS} alt="NOVIQ Studio & Solutions" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-noviq' : 'text-ink-muted hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
        <button
          type="button"
          className="btn-ghost lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-cream-300 bg-cream-50 px-5 py-4 lg:hidden">
          <Link to="/" className="mb-4 inline-flex w-[180px]" onClick={() => setOpen(false)}>
            <Logo variant="dark" className={HEADER_LOGO_CLASS} alt="NOVIQ Studio & Solutions" />
          </Link>
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `py-2 text-base ${isActive ? 'text-noviq' : 'text-ink'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
