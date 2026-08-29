import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import { getApiErrorMessage } from '../../api/client';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import LoadingState from '../../components/common/LoadingState';
import { useToast } from '../../components/common/Toast';
import { PROJECT_FILTERS, PROJECT_STATUSES } from '../../utils/constants';
import { categoryLabel } from '../../utils/format';

const PAGE_SIZE = 10;

function invalidateProjectViews(queryClient) {
  queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
  queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
}

export default function AdminProjectsPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-projects', page, PAGE_SIZE, search, category, status],
    queryFn: () => adminApi.listProjects({ page, size: PAGE_SIZE, search, category, status }),
  });
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteProject,
    onSuccess: () => {
      toast.push('Project deleted.');
      invalidateProjectViews(queryClient);
      setPendingDelete(null);
    },
    onError: (error) => toast.push(getApiErrorMessage(error, 'Project could not be deleted. Please try again.'), 'error'),
  });
  const statusMutation = useMutation({
    mutationFn: ({ id, next }) => adminApi.updateProjectStatus(id, next),
    onSuccess: () => invalidateProjectViews(queryClient),
  });
  const featuredMutation = useMutation({
    mutationFn: ({ id, featured }) => adminApi.updateProjectFeatured(id, featured),
    onSuccess: () => invalidateProjectViews(queryClient),
  });

  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <input
            className="input"
            placeholder="Search projects"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
          />
          <select
            className="input"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(0);
            }}
          >
            {PROJECT_FILTERS.map((item) => (
              <option key={item.label} value={item.value}>{item.label}</option>
            ))}
          </select>
          <select
            className="input"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(0);
            }}
          >
            <option value="">All statuses</option>
            {PROJECT_STATUSES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <Link to="/admin/projects/new" className="btn-primary">New project</Link>
      </div>
      {isLoading ? <LoadingState /> : null}
      {isError ? (
        <ErrorState title="Projects could not be loaded. Please try again." text="The project list could not be retrieved from the server." />
      ) : null}
      {!isLoading && !isError && items.length === 0 ? (
        <EmptyState title="No projects found. Create your first project." />
      ) : null}
      {!isLoading && !isError && items.length > 0 ? (
        <>
          <div className="admin-table-wrap hidden md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-cream-200 text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((project) => (
                  <tr key={project.id} className="border-t border-cream-300">
                    <td className="max-w-xs truncate px-4 py-3 font-medium">{project.title}</td>
                    <td className="px-4 py-3">{categoryLabel(project.category)}</td>
                    <td className="px-4 py-3">{project.status}</td>
                    <td className="px-4 py-3">{project.featured ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">
                      <RowActions project={project} onStatus={statusMutation.mutate} onFeatured={featuredMutation.mutate} onDelete={setPendingDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:hidden">
            {items.map((project) => (
              <article key={project.id} className="card p-4">
                <h2 className="font-semibold">{project.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{categoryLabel(project.category)} · {project.status}</p>
                <div className="mt-3">
                  <RowActions project={project} onStatus={statusMutation.mutate} onFeatured={featuredMutation.mutate} onDelete={setPendingDelete} />
                </div>
              </article>
            ))}
          </div>
          {data && data.totalPages > 1 ? (
            <div className="flex justify-center gap-3">
              <button type="button" className="btn-secondary" disabled={data.first} onClick={() => setPage((value) => value - 1)}>Previous</button>
              <button type="button" className="btn-secondary" disabled={data.last} onClick={() => setPage((value) => value + 1)}>Next</button>
            </div>
          ) : null}
        </>
      ) : null}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete project?"
        message="This cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => deleteMutation.mutate(pendingDelete)}
      />
    </div>
  );
}

function RowActions({ project, onStatus, onFeatured, onDelete }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <Link to={`/admin/projects/${project.id}/edit`} className="btn-ghost px-3 py-2">Edit</Link>
      <button type="button" className="btn-ghost px-3 py-2" onClick={() => onStatus({ id: project.id, next: project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' })}>
        {project.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
      </button>
      <button type="button" className="btn-ghost px-3 py-2" onClick={() => onStatus({ id: project.id, next: 'ARCHIVED' })}>Archive</button>
      <button type="button" className="btn-ghost px-3 py-2" onClick={() => onFeatured({ id: project.id, featured: !project.featured })}>
        {project.featured ? 'Unfeature' : 'Feature'}
      </button>
      <button type="button" className="btn-ghost px-3 py-2 text-red-700" onClick={() => onDelete(project.id)}>Delete</button>
    </div>
  );
}
