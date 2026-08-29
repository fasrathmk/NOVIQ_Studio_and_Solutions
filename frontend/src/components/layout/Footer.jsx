import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Logo from '../common/Logo';

export default function Footer() {
  const { data: settings } = useQuery({ queryKey: ['public-settings'], queryFn: publicApi.getSettings });
  const { data: services = [] } = useQuery({ queryKey: ['public-services'], queryFn: publicApi.getServices });

  return (
    <footer className="border-t border-cream-300 bg-ink text-cream-100">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="inline-flex w-full max-w-[200px] sm:max-w-[240px]">
            <Logo
              variant="light"
              className="block h-auto w-full object-contain"
              alt="NOVIQ Studio & Solutions"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-200">
            {settings?.footerDescription ||
              'NOVIQ Studio & Solutions analyzes business needs, designs brands, builds digital products, automates processes, and visualizes spaces.'}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noviq-light">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/work" className="hover:text-white">Work</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noviq-light">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noviq-light">Contact</p>
          <ul className="mt-4 space-y-2">
            {settings?.primaryEmail ? (
              <li>
                <a href={`mailto:${settings.primaryEmail}`} className="hover:text-white">
                  {settings.primaryEmail}
                </a>
              </li>
            ) : null}
            {settings?.phone ? (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings?.location ? <li>{settings.location}</li> : null}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {settings?.instagramUrl ? <a href={settings.instagramUrl} className="hover:text-white">Instagram</a> : null}
            {settings?.facebookUrl ? <a href={settings.facebookUrl} className="hover:text-white">Facebook</a> : null}
            {settings?.linkedinUrl ? <a href={settings.linkedinUrl} className="hover:text-white">LinkedIn</a> : null}
            {settings?.behanceUrl ? <a href={settings.behanceUrl} className="hover:text-white">Behance</a> : null}
            {settings?.githubUrl ? <a href={settings.githubUrl} className="hover:text-white">GitHub</a> : null}
          </div>
        </div>
      </div>
      <div className="container-wide flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-cream-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} NOVIQ Studio & Solutions. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
