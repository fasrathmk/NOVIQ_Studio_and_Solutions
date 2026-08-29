import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import { testimonialSchema } from '../../schemas/testimonial';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';
import { getApiErrorMessage } from '../../api/client';

export default function AdminTestimonialsPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { data: items = [] } = useQuery({ queryKey: ['admin-testimonials'], queryFn: adminApi.listTestimonials });
  const { data: projects } = useQuery({ queryKey: ['admin-projects-all'], queryFn: () => adminApi.listProjects({ size: 50 }) });
  const form = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { clientName: '', companyOrRole: '', quote: '', profileImageUrl: '', projectId: '', approved: false, demonstration: true, displayOrder: 0 },
  });

  const saveMutation = useMutation({
    mutationFn: (values) => {
      const payload = { ...values, projectId: values.projectId || null, profileImageUrl: values.profileImageUrl || null };
      return editingId ? adminApi.updateTestimonial(editingId, payload) : adminApi.createTestimonial(payload);
    },
    onSuccess: () => {
      toast.push('Testimonial saved.');
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      form.reset();
      setEditingId(null);
    },
    onError: (error) => toast.push(getApiErrorMessage(error), 'error'),
  });
  const approvalMutation = useMutation({
    mutationFn: ({ id, approved }) => adminApi.setTestimonialApproval(id, approved),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      setPendingDelete(null);
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="card space-y-4 p-6" onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}>
        <h2 className="font-display text-2xl">{editingId ? 'Edit testimonial' : 'New testimonial'}</h2>
        <p className="text-sm text-ink-muted">Only approved testimonials appear publicly. Mark demonstration quotes clearly.</p>
        <Input form={form} name="clientName" label="Client name" />
        <Input form={form} name="companyOrRole" label="Company or role" />
        <Input form={form} name="quote" label="Quote" textarea />
        <Input form={form} name="profileImageUrl" label="Profile image URL" />
        <label className="label">Related project</label>
        <select className="input" {...form.register('projectId')}>
          <option value="">None</option>
          {projects?.items?.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}
        </select>
        <Input form={form} name="displayOrder" label="Display order" />
        <label className="flex gap-2 text-sm"><input type="checkbox" {...form.register('approved')} /> Approved</label>
        <label className="flex gap-2 text-sm"><input type="checkbox" {...form.register('demonstration')} /> Demonstration quote</label>
        <button type="submit" className="btn-primary">{saveMutation.isPending ? 'Saving…' : 'Save'}</button>
      </form>
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="card p-5">
            {item.demonstration ? <p className="text-xs font-semibold text-noviq">Demonstration quote</p> : null}
            <p className="mt-2 font-display text-xl">“{item.quote}”</p>
            <p className="mt-2 text-sm text-ink-muted">{item.clientName}{item.companyOrRole ? ` · ${item.companyOrRole}` : ''}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <button type="button" className="btn-ghost px-3 py-2" onClick={() => { setEditingId(item.id); form.reset({ ...item, projectId: item.projectId || '' }); }}>Edit</button>
              <button type="button" className="btn-ghost px-3 py-2" onClick={() => approvalMutation.mutate({ id: item.id, approved: !item.approved })}>{item.approved ? 'Hide' : 'Approve'}</button>
              <button type="button" className="btn-ghost px-3 py-2 text-red-700" onClick={() => setPendingDelete(item.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      <ConfirmDialog open={Boolean(pendingDelete)} title="Delete testimonial?" message="This cannot be undone." confirmLabel="Delete" onCancel={() => setPendingDelete(null)} onConfirm={() => deleteMutation.mutate(pendingDelete)} />
    </div>
  );
}

function Input({ form, name, label, textarea = false }) {
  const error = form.formState.errors[name];
  return (
    <div>
      <label className="label">{label}</label>
      {textarea ? <textarea className="input min-h-28" {...form.register(name)} /> : <input className="input" {...form.register(name)} />}
      {error?.message ? <p className="field-error">{error.message}</p> : null}
    </div>
  );
}
