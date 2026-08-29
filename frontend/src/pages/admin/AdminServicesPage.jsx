import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/admin';
import { serviceSchema } from '../../schemas/service';
import { getApiErrorMessage } from '../../api/client';
import { useToast } from '../../components/common/Toast';
import LoadingState from '../../components/common/LoadingState';
import { capabilityLabel } from '../../utils/format';

export default function AdminServicesPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);
  const { data: services = [], isLoading } = useQuery({ queryKey: ['admin-services'], queryFn: adminApi.listServices });
  const { data: detail } = useQuery({
    queryKey: ['admin-service', selectedId],
    queryFn: () => adminApi.getService(selectedId),
    enabled: Boolean(selectedId),
  });
  const form = useForm({ resolver: zodResolver(serviceSchema) });

  useEffect(() => {
    if (detail) {
      form.reset({
        ...detail,
        deliverablesText: (detail.deliverables || []).map((item) => `${item.title}|${item.description || ''}`).join('\n'),
        processText: (detail.processSteps || []).map((item) => `${item.title}|${item.description || ''}`).join('\n'),
        faqsText: (detail.faqs || []).map((item) => `${item.question}|${item.answer}`).join('\n'),
      });
    }
  }, [detail, form]);

  const saveMutation = useMutation({
    mutationFn: (values) => adminApi.updateService(selectedId, toPayload(values)),
    onSuccess: () => {
      toast.push('Service updated.');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['admin-service', selectedId] });
    },
    onError: (error) => toast.push(getApiErrorMessage(error), 'error'),
  });
  const activeMutation = useMutation({
    mutationFn: ({ id, active }) => adminApi.setServiceActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-services'] }),
  });
  const reorderMutation = useMutation({
    mutationFn: (ids) => adminApi.reorderServices(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-services'] }),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <aside className="card p-4">
        <h2 className="font-semibold">Services</h2>
        {isLoading ? <LoadingState /> : (
          <ul className="mt-4 space-y-2">
            {services.map((service, index) => (
              <li key={service.id} className="rounded-xl border border-cream-300 p-3">
                <button type="button" className="block w-full text-left" onClick={() => setSelectedId(service.id)}>
                  <span className="font-medium">{service.title}</span>
                  <span className="mt-1 block text-xs text-ink-soft">{capabilityLabel(service.capabilityGroup)} · {service.active ? 'Active' : 'Inactive'}</span>
                </button>
                <div className="mt-2 flex gap-2 text-xs">
                  <button type="button" className="btn-ghost px-2 py-1" disabled={index === 0} onClick={() => move(services, index, -1, reorderMutation.mutate)}>Up</button>
                  <button type="button" className="btn-ghost px-2 py-1" disabled={index === services.length - 1} onClick={() => move(services, index, 1, reorderMutation.mutate)}>Down</button>
                  <button type="button" className="btn-ghost px-2 py-1" onClick={() => activeMutation.mutate({ id: service.id, active: !service.active })}>
                    {service.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs text-ink-muted">Protected services cannot be deleted. They can be updated or deactivated.</p>
      </aside>
      <section className="card p-6">
        {selectedId && detail ? (
          <form className="space-y-4" onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}>
            <Input form={form} name="title" label="Title" />
            <Input form={form} name="slug" label="Slug" />
            <label className="label">Capability group</label>
            <select className="input" {...form.register('capabilityGroup')}>
              <option value="DESIGN">Design</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="VISUALIZATION">Visualization</option>
            </select>
            <Input form={form} name="shortDescription" label="Short description" textarea />
            <Input form={form} name="fullDescription" label="Full description" textarea />
            <Input form={form} name="problemsSolved" label="Problems solved" textarea />
            <Input form={form} name="contactCta" label="Contact CTA" />
            <Input form={form} name="displayOrder" label="Display order" />
            <Input form={form} name="deliverablesText" label="Deliverables (title|description per line)" textarea />
            <Input form={form} name="processText" label="Process steps (title|description per line)" textarea />
            <Input form={form} name="faqsText" label="FAQs (question|answer per line)" textarea />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register('active')} /> Active</label>
            <button type="submit" className="btn-primary" disabled={saveMutation.isPending}>Save service</button>
          </form>
        ) : <p className="text-ink-muted">Select a service to edit.</p>}
      </section>
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

function parseLines(text) {
  return (text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [first, ...rest] = line.split('|');
      return { title: first.trim(), description: rest.join('|').trim(), displayOrder: index + 1 };
    });
}

function toPayload(values) {
  return {
    title: values.title,
    slug: values.slug,
    capabilityGroup: values.capabilityGroup,
    shortDescription: values.shortDescription,
    fullDescription: values.fullDescription,
    problemsSolved: values.problemsSolved,
    contactCta: values.contactCta,
    active: values.active,
    displayOrder: Number(values.displayOrder),
    deliverables: parseLines(values.deliverablesText),
    processSteps: parseLines(values.processText),
    faqs: parseLines(values.faqsText).map((item) => ({ question: item.title, answer: item.description || item.title, displayOrder: item.displayOrder })),
  };
}

function move(services, index, direction, submit) {
  const next = [...services];
  const target = index + direction;
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  submit(next.map((service) => service.id));
}
