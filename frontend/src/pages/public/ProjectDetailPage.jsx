import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import SmartImage from '../../components/common/SmartImage';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { categoryLabel } from '../../utils/format';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['public-project', slug],
    queryFn: () => publicApi.getProject(slug),
  });

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError || !project) {
    return (
      <section className="container-wide py-16">
        <ErrorState title="Project not found" text="This case study is unpublished or does not exist." />
      </section>
    );
  }

  const sections = [
    ['Overview', project.overview],
    ['Challenge', project.challenge],
    ['Approach', project.approach],
    ['Solution', project.solution],
    ['Results', project.results],
    ['Services provided', project.servicesProvided],
  ].filter(([, value]) => value);

  return (
    <>
      <Seo title={project.title} description={project.shortDescription} image={project.coverImageUrl} />
      <article className="pb-20">
        <header className="container-wide py-16">
          <p className="eyebrow">{categoryLabel(project.category)}</p>
          <h1 className="heading mt-4 max-w-4xl">{project.title}</h1>
          <p className="lede mt-4">{project.shortDescription}</p>
          {project.demonstration ? (
            <p className="mt-4 text-sm font-medium text-noviq">Demonstration portfolio content. Editable from the admin dashboard.</p>
          ) : null}
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
            {project.clientName ? (
              <div>
                <dt className="text-ink-soft">Client</dt>
                <dd>{project.clientName}</dd>
              </div>
            ) : null}
            {project.industry ? (
              <div>
                <dt className="text-ink-soft">Industry</dt>
                <dd>{project.industry}</dd>
              </div>
            ) : null}
            {project.projectYear ? (
              <div>
                <dt className="text-ink-soft">Year</dt>
                <dd>{project.projectYear}</dd>
              </div>
            ) : null}
          </dl>
        </header>
        <div className="container-wide">
          <SmartImage src={project.coverImageUrl} alt={project.coverImageAlt || project.title} className="h-[28rem] w-full rounded-card object-cover" />
        </div>
        <div className="container-wide mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="font-display text-3xl">{title}</h2>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-ink-muted">{body}</p>
              </section>
            ))}
          </div>
          <aside className="card h-fit p-6">
            <h2 className="font-display text-2xl">Details</h2>
            {project.technologies?.length ? (
              <p className="mt-4 text-sm text-ink-muted">{project.technologies.join(', ')}</p>
            ) : null}
            <div className="mt-5 flex flex-col gap-2 text-sm">
              {project.liveUrl ? <a className="break-all text-noviq" href={project.liveUrl}>Live website</a> : null}
              {project.behanceUrl ? <a className="break-all text-noviq" href={project.behanceUrl}>Behance</a> : null}
              {project.githubUrl ? <a className="break-all text-noviq" href={project.githubUrl}>GitHub</a> : null}
            </div>
          </aside>
        </div>
        {project.images?.length ? (
          <section className="container-wide mt-12 grid gap-6 md:grid-cols-2">
            {project.images.map((image) => (
              <figure key={image.id}>
                <SmartImage src={image.imageUrl} alt={image.altText || project.title} className="h-72 w-full rounded-card object-cover" />
                {image.caption ? <figcaption className="mt-2 text-sm text-ink-muted">{image.caption}</figcaption> : null}
              </figure>
            ))}
          </section>
        ) : null}
        <nav className="container-wide mt-16 flex flex-col gap-4 border-t border-cream-300 pt-8 sm:flex-row sm:justify-between">
          {project.previousProject ? (
            <Link to={`/work/${project.previousProject.slug}`} className="text-sm">
              Previous<br />
              <span className="font-display text-xl">{project.previousProject.title}</span>
            </Link>
          ) : <span />}
          {project.nextProject ? (
            <Link to={`/work/${project.nextProject.slug}`} className="text-right text-sm">
              Next<br />
              <span className="font-display text-xl">{project.nextProject.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </>
  );
}
