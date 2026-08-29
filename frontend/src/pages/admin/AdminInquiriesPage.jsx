import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import LoadingState from '../../components/common/LoadingState';
import { INQUIRY_STATUSES } from '../../utils/constants';
import { budgetLabel, formatDate, serviceLabel } from '../../utils/format';
import { useToast } from '../../components/common/Toast';

export default function AdminInquiriesPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const params = useMemo(
    () => ({ search: search || undefined, service: service || undefined, status: status || undefined, page, size: 12 }),
    [search, service, status, page],
  );
  const { data, isLoading } = useQuery({ queryKey: ['admin-inquiries', params], queryFn: () => adminApi.listInquiries(params) });
  const { data: services = [] } = useQuery({ queryKey: ['admin-services'], queryFn: adminApi.listServices });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
  const statusMutation = useMutation({
    mutationFn: ({ id, next }) => adminApi.updateInquiryStatus(id, next),
    onSuccess: (item) => { setSelected(item); invalidate(); },
  });
  const noteMutation = useMutation({
    mutationFn: ({ id, internalNote }) => adminApi.updateInquiryNote(id, internalNote),
    onSuccess: (item) => { setSelected(item); toast.push('Note saved.'); invalidate(); },
  });
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteInquiry,
    onSuccess: () => { setSelected(null); setPendingDelete(null); invalidate(); },
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input" placeholder="Search name or email" value={search} onChange={(event) => { setSearch(event.target.value); setPage(0); }} />
          <select className="input" value={service} onChange={(event) => { setService(event.target.value); setPage(0); }}>
            <option value="">All services</option>
            {services.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
          </select>
          <select className="input" value={status} onChange={(event) => { setStatus(event.target.value); setPage(0); }}>
            <option value="">All statuses</option>
            {INQUIRY_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        {isLoading ? <LoadingState /> : data?.content?.map((item) => (
          <button key={item.id} type="button" className="card w-full p-4 text-left" onClick={() => { setSelected(item); setNote(item.internalNote || ''); }}>
            <p className="font-medium">{item.fullName}</p>
            <p className="break-all text-sm text-ink-muted">{item.email} · {serviceLabel(item.requiredService)}</p>
            <p className="mt-1 text-xs text-ink-soft">{item.status} · {formatDate(item.createdAt)}</p>
          </button>
        ))}
        {data && data.totalPages > 1 ? (
          <div className="flex gap-3">
            <button type="button" className="btn-secondary" disabled={data.first} onClick={() => setPage((value) => value - 1)}>Previous</button>
            <button type="button" className="btn-secondary" disabled={data.last} onClick={() => setPage((value) => value + 1)}>Next</button>
          </div>
        ) : null}
      </div>
      <aside className="card p-6">
        {selected ? (
          <div className="space-y-3 text-sm">
            <h2 className="font-display text-2xl">{selected.fullName}</h2>
            <p className="break-all">{selected.email}</p>
            <p>{selected.phone || 'No phone'}</p>
            <p>{selected.companyName || 'No company'}</p>
            <p>{serviceLabel(selected.requiredService)}</p>
            <p>{budgetLabel(selected.budgetRange)}</p>
            <p>{selected.expectedDeadline || 'No deadline'}</p>
            {selected.referenceUrl ? <p className="break-all">{selected.referenceUrl}</p> : null}
            <p className="whitespace-pre-line text-ink-muted">{selected.projectDescription}</p>
            <label className="label">Status</label>
            <select className="input" value={selected.status} onChange={(event) => statusMutation.mutate({ id: selected.id, next: event.target.value })}>
              {INQUIRY_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <label className="label">Internal note</label>
            <textarea className="input min-h-28" value={note} onChange={(event) => setNote(event.target.value)} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" onClick={() => noteMutation.mutate({ id: selected.id, internalNote: note })}>Save note</button>
              <button type="button" className="btn-secondary" onClick={() => statusMutation.mutate({ id: selected.id, next: 'ARCHIVED' })}>Archive</button>
              <button type="button" className="btn-secondary" onClick={() => statusMutation.mutate({ id: selected.id, next: 'SPAM' })}>Mark spam</button>
              <button type="button" className="btn-ghost text-red-700" onClick={() => setPendingDelete(selected.id)}>Delete</button>
            </div>
          </div>
        ) : <p className="text-ink-muted">Select an inquiry to view the complete message.</p>}
      </aside>
      <ConfirmDialog open={Boolean(pendingDelete)} title="Delete inquiry?" message="This cannot be undone." confirmLabel="Delete" onCancel={() => setPendingDelete(null)} onConfirm={() => deleteMutation.mutate(pendingDelete)} />
    </div>
  );
}
