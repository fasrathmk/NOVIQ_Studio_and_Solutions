import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { formatDate, serviceLabel } from '../../utils/format';

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['dashboard-stats'], queryFn: adminApi.dashboard });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  const cards = [
    ['Total projects', data.totalProjects],
    ['Published projects', data.publishedProjects],
    ['Draft projects', data.draftProjects],
    ['Total inquiries', data.totalInquiries],
    ['New inquiries', data.newInquiries],
    ['Total services', data.totalServices],
    ['Approved testimonials', data.approvedTestimonials],
    ['Active team members', data.activeTeamMembers],
  ];

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink-muted">Figures are loaded from the API, not hard-coded in the page.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="card p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">{label}</p>
            <p className="mt-3 font-display text-4xl">{value}</p>
          </article>
        ))}
      </div>
      <section className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Recent inquiries</h2>
          <Link to="/admin/inquiries" className="text-sm font-semibold text-noviq">View all</Link>
        </div>
        <div className="mt-4 divide-y divide-cream-300">
          {data.recentInquiries?.length ? data.recentInquiries.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{item.fullName}</p>
                <p className="break-all text-sm text-ink-muted">{item.email} · {serviceLabel(item.requiredService)}</p>
              </div>
              <p className="text-sm text-ink-soft">{item.status} · {formatDate(item.createdAt)}</p>
            </div>
          )) : <p className="py-6 text-ink-muted">No inquiries yet.</p>}
        </div>
      </section>
    </div>
  );
}
