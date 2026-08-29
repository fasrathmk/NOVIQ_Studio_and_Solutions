import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import Seo from '../../components/common/Seo';
import ProjectCard from '../../components/common/ProjectCard';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { PROJECT_FILTERS } from '../../utils/constants';

export default function WorkPage() {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(0);
  const params = useMemo(() => ({ page, size: 9, ...(category ? { category } : {}) }), [page, category]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-projects', params],
    queryFn: () => publicApi.getProjects(params),
  });

  return (
    <>
      <Seo title="Work" description="Selected NOVIQ projects across branding, UI/UX, development, automation, business analysis, and 3D landscape." />
      <section className="container-wide py-16">
        <p className="eyebrow">Work</p>
        <h1 className="heading mt-4">Selected projects</h1>
        <p className="lede mt-4">Published case studies only. Seeded examples are labelled as demonstration portfolio content.</p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.label}
              type="button"
              role="tab"
              aria-selected={category === filter.value}
              className={`rounded-pill px-4 py-2 text-sm ${category === filter.value ? 'bg-ink text-cream-100' : 'border border-cream-300 bg-cream-50'}`}
              onClick={() => {
                setCategory(filter.value);
                setPage(0);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {isLoading ? <LoadingState /> : null}
        {isError ? <div className="mt-8"><ErrorState /></div> : null}
        {!isLoading && !isError && !data?.content?.length ? (
          <div className="mt-8">
            <EmptyState title="No published projects in this category" text="Try another filter or check back after new work is published." />
          </div>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data?.content?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {data && data.totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button type="button" className="btn-secondary" disabled={data.first} onClick={() => setPage((value) => value - 1)}>
              Previous
            </button>
            <p className="text-sm text-ink-muted">
              Page {data.page + 1} of {data.totalPages}
            </p>
            <button type="button" className="btn-secondary" disabled={data.last} onClick={() => setPage((value) => value + 1)}>
              Next
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
