import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../api/admin';
import { projectSchema } from '../../schemas/project';
import { getApiErrorMessage } from '../../api/client';
import { useToast } from '../../components/common/Toast';
import LoadingState from '../../components/common/LoadingState';
import { PROJECT_FILTERS, PROJECT_STATUSES } from '../../utils/constants';

export default function ProjectFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-project', id],
    queryFn: () => adminApi.getProject(id),
    enabled: isEdit,
  });
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyProject(),
  });
  const { fields, append, remove, move } = useFieldArray({ control: form.control, name: 'images' });

  useEffect(() => {
    if (data) {
      form.reset(toForm(data));
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (payload) => (isEdit ? adminApi.updateProject(id, payload) : adminApi.createProject(payload)),
    onSuccess: () => {
      toast.push(isEdit ? 'Project updated.' : 'Project created.');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      navigate('/admin/projects');
    },
    onError: (error) => toast.push(getApiErrorMessage(error), 'error'),
  });

  if (isEdit && isLoading) return <LoadingState />;

  return (
    <form
      className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      onSubmit={form.handleSubmit((values) => mutation.mutate(toPayload(values)))}
      noValidate
    >
      <div className="space-y-4 card p-6">
        <h2 className="font-display text-2xl">{isEdit ? 'Edit project' : 'New project'}</h2>
        <Input form={form} name="title" label="Title" />
        <Input form={form} name="slug" label="Slug" />
        <Input form={form} name="shortDescription" label="Short description" textarea />
        <Input form={form} name="overview" label="Overview" textarea />
        <Input form={form} name="challenge" label="Challenge" textarea />
        <Input form={form} name="approach" label="Approach" textarea />
        <Input form={form} name="solution" label="Solution" textarea />
        <Input form={form} name="results" label="Results" textarea />
        <Input form={form} name="servicesProvided" label="Services provided" textarea />
      </div>
      <div className="space-y-4">
        <div className="card space-y-4 p-6">
          <Input form={form} name="clientName" label="Client name" />
          <Input form={form} name="industry" label="Industry" />
          <Input form={form} name="projectYear" label="Year" />
          <label className="label">Category</label>
          <select className="input" {...form.register('category')}>
            {PROJECT_FILTERS.filter((item) => item.value).map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <label className="label">Status</label>
          <select className="input" {...form.register('status')}>
            {PROJECT_STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <Input form={form} name="displayOrder" label="Display order" />
          <Input form={form} name="coverImageUrl" label="Cover image URL" />
          <Input form={form} name="coverImageAlt" label="Cover image alt text" />
          <Input form={form} name="liveUrl" label="Live URL" />
          <Input form={form} name="behanceUrl" label="Behance URL" />
          <Input form={form} name="githubUrl" label="GitHub URL" />
          <Input form={form} name="technologies" label="Technologies (comma separated)" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register('featured')} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register('demonstration')} /> Demonstration portfolio content</label>
        </div>
        <div className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Gallery</h3>
            <button type="button" className="btn-ghost" onClick={() => append({ imageUrl: '', altText: '', caption: '', displayOrder: fields.length + 1 })}>Add image</button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2 rounded-xl border border-cream-300 p-3">
              <Input form={form} name={`images.${index}.imageUrl`} label="Image URL" />
              <Input form={form} name={`images.${index}.altText`} label="Alt text" />
              <Input form={form} name={`images.${index}.caption`} label="Caption" />
              <div className="flex gap-2">
                <button type="button" className="btn-ghost" disabled={index === 0} onClick={() => move(index, index - 1)}>Up</button>
                <button type="button" className="btn-ghost" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)}>Down</button>
                <button type="button" className="btn-ghost text-red-700" onClick={() => remove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>{mutation.isPending ? 'Saving…' : 'Save project'}</button>
      </div>
    </form>
  );
}

function Input({ form, name, label, textarea = false }) {
  const error = name.split('.').reduce((acc, key) => acc?.[key], form.formState.errors);
  return (
    <div>
      <label className="label">{label}</label>
      {textarea ? <textarea className="input min-h-28" {...form.register(name)} /> : <input className="input" {...form.register(name)} />}
      {error?.message ? <p className="field-error">{error.message}</p> : null}
    </div>
  );
}

function emptyProject() {
  return {
    title: '',
    slug: '',
    clientName: '',
    industry: '',
    projectYear: '',
    category: 'DEVELOPMENT',
    shortDescription: '',
    coverImageUrl: '',
    coverImageAlt: '',
    overview: '',
    challenge: '',
    approach: '',
    solution: '',
    results: '',
    servicesProvided: '',
    liveUrl: '',
    behanceUrl: '',
    githubUrl: '',
    featured: false,
    demonstration: false,
    displayOrder: 0,
    status: 'DRAFT',
    technologies: '',
    images: [],
  };
}

function toForm(project) {
  return {
    ...emptyProject(),
    ...project,
    projectYear: project.projectYear ? String(project.projectYear) : '',
    technologies: (project.technologies || []).join(', '),
    images: project.images || [],
  };
}

function toPayload(values) {
  return {
    ...values,
    projectYear: values.projectYear ? Number(values.projectYear) : null,
    technologies: values.technologies ? values.technologies.split(',').map((item) => item.trim()).filter(Boolean) : [],
    images: (values.images || []).map((image, index) => ({ ...image, displayOrder: index + 1 })),
    liveUrl: values.liveUrl || null,
    behanceUrl: values.behanceUrl || null,
    githubUrl: values.githubUrl || null,
    coverImageUrl: values.coverImageUrl || null,
  };
}
