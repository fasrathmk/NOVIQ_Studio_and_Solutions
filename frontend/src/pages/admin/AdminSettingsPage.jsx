import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import { settingsSchema } from '../../schemas/settings';
import LoadingState from '../../components/common/LoadingState';
import { useToast } from '../../components/common/Toast';
import { getApiErrorMessage } from '../../api/client';

const FIELDS = [
  ['heroHeading', 'Hero heading'],
  ['heroSupportingText', 'Hero supporting text', true],
  ['primaryEmail', 'Primary email'],
  ['phone', 'Phone or WhatsApp'],
  ['location', 'Location'],
  ['instagramUrl', 'Instagram URL'],
  ['facebookUrl', 'Facebook URL'],
  ['linkedinUrl', 'LinkedIn URL'],
  ['behanceUrl', 'Behance URL'],
  ['githubUrl', 'GitHub URL'],
  ['footerDescription', 'Footer description', true],
  ['defaultSeoTitle', 'Default SEO title'],
  ['defaultSeoDescription', 'Default SEO description', true],
];

export default function AdminSettingsPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-settings'], queryFn: adminApi.getSettings });
  const form = useForm({ resolver: zodResolver(settingsSchema) });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: adminApi.updateSettings,
    onSuccess: () => {
      toast.push('Settings updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['public-settings'] });
    },
    onError: (error) => toast.push(getApiErrorMessage(error), 'error'),
  });

  if (isLoading) return <LoadingState />;

  return (
    <form className="card max-w-3xl space-y-4 p-6" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
      <h2 className="font-display text-2xl">Website settings</h2>
      <p className="text-sm text-ink-muted">These fields are strongly typed. There is no unrestricted key-value editor.</p>
      {FIELDS.map(([name, label, textarea]) => (
        <div key={name}>
          <label className="label">{label}</label>
          {textarea ? <textarea className="input min-h-24" {...form.register(name)} /> : <input className="input" {...form.register(name)} />}
          {form.formState.errors[name] ? <p className="field-error">{form.formState.errors[name].message}</p> : null}
        </div>
      ))}
      <button type="submit" className="btn-primary" disabled={mutation.isPending}>Save settings</button>
    </form>
  );
}
