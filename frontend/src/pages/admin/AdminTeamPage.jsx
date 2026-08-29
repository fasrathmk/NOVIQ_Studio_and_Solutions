import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import { teamSchema } from '../../schemas/team';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';
import { getApiErrorMessage } from '../../api/client';

export default function AdminTeamPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { data: members = [] } = useQuery({ queryKey: ['admin-team'], queryFn: adminApi.listTeam });
  const form = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: { name: '', role: '', biography: '', imageUrl: '', linkedinUrl: '', behanceUrl: '', githubUrl: '', active: true, displayOrder: 0 },
  });
  const saveMutation = useMutation({
    mutationFn: (values) => (editingId ? adminApi.updateTeamMember(editingId, values) : adminApi.createTeamMember(values)),
    onSuccess: () => {
      toast.push('Team member saved.');
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      form.reset();
      setEditingId(null);
    },
    onError: (error) => toast.push(getApiErrorMessage(error), 'error'),
  });
  const activeMutation = useMutation({
    mutationFn: ({ id, active }) => adminApi.setTeamActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-team'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      setPendingDelete(null);
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="card space-y-4 p-6" onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}>
        <h2 className="font-display text-2xl">{editingId ? 'Edit team member' : 'New team member'}</h2>
        <Input form={form} name="name" label="Name" />
        <Input form={form} name="role" label="Role" />
        <Input form={form} name="biography" label="Short biography" textarea />
        <Input form={form} name="imageUrl" label="Image URL" />
        <Input form={form} name="linkedinUrl" label="LinkedIn URL" />
        <Input form={form} name="behanceUrl" label="Behance URL" />
        <Input form={form} name="githubUrl" label="GitHub URL" />
        <Input form={form} name="displayOrder" label="Display order" />
        <label className="flex gap-2 text-sm"><input type="checkbox" {...form.register('active')} /> Active</label>
        <button type="submit" className="btn-primary">Save</button>
      </form>
      <div className="space-y-4">
        {members.map((member) => (
          <article key={member.id} className="card p-5">
            <h3 className="font-display text-xl">{member.name}</h3>
            <p className="text-sm text-ink-muted">{member.role} · {member.active ? 'Active' : 'Inactive'}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <button type="button" className="btn-ghost px-3 py-2" onClick={() => { setEditingId(member.id); form.reset(member); }}>Edit</button>
              <button type="button" className="btn-ghost px-3 py-2" onClick={() => activeMutation.mutate({ id: member.id, active: !member.active })}>{member.active ? 'Deactivate' : 'Activate'}</button>
              <button type="button" className="btn-ghost px-3 py-2 text-red-700" onClick={() => setPendingDelete(member.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      <ConfirmDialog open={Boolean(pendingDelete)} title="Delete team member?" message="This cannot be undone." confirmLabel="Delete" onCancel={() => setPendingDelete(null)} onConfirm={() => deleteMutation.mutate(pendingDelete)} />
    </div>
  );
}

function Input({ form, name, label, textarea = false }) {
  const error = form.formState.errors[name];
  return (
    <div>
      <label className="label">{label}</label>
      {textarea ? <textarea className="input min-h-24" {...form.register(name)} /> : <input className="input" {...form.register(name)} />}
      {error?.message ? <p className="field-error">{error.message}</p> : null}
    </div>
  );
}
