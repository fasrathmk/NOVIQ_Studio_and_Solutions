import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { capabilityLabel, siteUrl } from '../../utils/format';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['public-service', slug],
    queryFn: () => publicApi.getService(slug),
  });

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError || !service) {
    return (
      <section className="container-wide py-16">
        <ErrorState title="Service not found" text="This service is unavailable or no longer listed." />
      </section>
    );
  }

  return (
    <>
      <Seo
        title={service.slug === 'business-analysis' ? 'Business Analysis Services | NOVIQ Studio & Solutions' : service.title}
        description={service.slug === 'business-analysis'
          ? 'NOVIQ helps businesses analyze processes, define requirements, improve workflows, and turn business needs into practical digital solutions.'
          : service.shortDescription}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          provider: { '@type': 'Organization', name: 'NOVIQ Studio & Solutions', url: siteUrl() },
        }}
      />
      <article className="container-wide py-16">
        <p className="eyebrow">{capabilityLabel(service.capabilityGroup)}</p>
        <h1 className="heading mt-4">{service.title}</h1>
        <p className="lede mt-4">{service.shortDescription}</p>
        <div className="mt-10 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-muted">
          {service.fullDescription.split('\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {service.problemsSolved ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl">Problems we help solve</h2>
            <p className="mt-4 max-w-3xl text-ink-muted">{service.problemsSolved}</p>
          </section>
        ) : null}
        <section className="mt-12">
          <h2 className="font-display text-3xl">Deliverables</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {service.deliverables.map((item) => (
              <li key={item.id} className="card p-5">
                <h3 className="font-semibold">{item.title}</h3>
                {item.description ? <p className="mt-2 text-sm text-ink-muted">{item.description}</p> : null}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-3xl">Process</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.processSteps.map((item) => (
              <li key={item.id} className="card p-5">
                <p className="text-xs text-noviq">{String(item.displayOrder).padStart(2, '0')}</p>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                {item.description ? <p className="mt-2 text-sm text-ink-muted">{item.description}</p> : null}
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-3xl">Questions</h2>
          <div className="mt-6 space-y-4">
            {service.faqs.map((item) => (
              <details key={item.id} className="card p-5">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-3 text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        {service.relatedProjects?.length ? (
          <section className="mt-12">
            <h2 className="font-display text-3xl">Related projects</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {service.relatedProjects.map((project) => (
                <Link key={project.slug} to={`/work/${project.slug}`} className="card p-5 hover:shadow-lift">
                  <h3 className="font-display text-xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{project.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <div className="mt-12 rounded-card bg-ink px-8 py-10 text-cream-100">
          <h2 className="font-display text-3xl">{service.contactCta || 'Start this project'}</h2>
          <Link to="/contact" className="btn-primary mt-6">
            Start a Project
          </Link>
        </div>
      </article>
    </>
  );
}
