import { Link } from 'react-router-dom';
import { categoryLabel } from '../../utils/format';
import SmartImage from './SmartImage';

const ACCENT_TEXT = {
  BRANDING: 'text-service-branding',
  UI_UX: 'text-service-uiux',
  DEVELOPMENT: 'text-service-development',
  AUTOMATION: 'text-service-automation',
  BUSINESS_ANALYSIS: 'text-service-analysis',
  LANDSCAPE: 'text-service-landscape',
};

export default function ProjectCard({ project }) {
  return (
    <article className="card overflow-hidden transition duration-200 hover:shadow-lift">
      <Link to={`/work/${project.slug}`} className="block">
        <SmartImage
          src={project.coverImageUrl}
          alt={project.coverImageAlt || project.title}
          className="h-56 w-full object-cover"
        />
      </Link>
      <div className="space-y-4 p-6">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${ACCENT_TEXT[project.category] || 'text-noviq'}`}>
          {categoryLabel(project.category)}
        </p>
        <h3 className="font-display text-2xl leading-tight">
          <Link to={`/work/${project.slug}`} className="hover:text-noviq">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{project.shortDescription}</p>
        {project.technologies?.length ? (
          <p className="text-xs uppercase tracking-wide text-ink-soft">{project.technologies.join(' · ')}</p>
        ) : null}
        {project.demonstration ? (
          <p className="text-xs font-medium text-ink-muted">Demonstration portfolio content</p>
        ) : null}
        <Link to={`/work/${project.slug}`} className="inline-flex text-sm font-semibold text-noviq">
          View Case Study
        </Link>
      </div>
    </article>
  );
}
