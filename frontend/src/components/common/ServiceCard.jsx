import { Link } from 'react-router-dom';
import { capabilityLabel } from '../../utils/format';
import { getServiceVisual } from '../../utils/serviceVisual';

export default function ServiceCard({ service, compact = false }) {
  const visual = getServiceVisual(service.slug);
  const Icon = visual.icon;

  return (
    <article className={`card ${compact ? 'p-6' : 'p-8'}`}>
      <div className={`inline-flex rounded-card p-3 ${visual.surface}`}>
        <Icon className={visual.accent} size={compact ? 20 : 24} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <p className={`mt-4 text-xs uppercase tracking-[0.18em] ${visual.accent}`}>
        {capabilityLabel(service.capabilityGroup)}
      </p>
      {compact ? (
        <h3 className="mt-3 font-display text-2xl">{service.title}</h3>
      ) : (
        <h2 className="mt-3 font-display text-3xl">{service.title}</h2>
      )}
      <p className={`mt-3 leading-relaxed text-ink-muted ${compact ? 'text-sm' : ''}`}>{service.shortDescription}</p>
      <Link to={`/services/${service.slug}`} className="mt-5 inline-flex text-sm font-semibold text-noviq">
        {compact ? 'View service' : `Explore ${service.title}`}
      </Link>
    </article>
  );
}
