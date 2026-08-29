import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/public';
import { submitInquiry } from '../../api/web3forms';
import { contactSchema } from '../../schemas/contact';
import { BUDGET_OPTIONS } from '../../utils/constants';
import { getApiErrorMessage } from '../../api/client';
import Seo from '../../components/common/Seo';
import { useToast } from '../../components/common/Toast';

export default function ContactPage() {
  const toast = useToast();
  const { data: services = [] } = useQuery({ queryKey: ['public-services'], queryFn: publicApi.getServices });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      requiredService: '',
      budgetRange: '',
      expectedDeadline: '',
      projectDescription: '',
      referenceUrl: '',
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: submitInquiry,
    onSuccess: (data) => {
      toast.push(data.message || 'Your inquiry has been received.');
      reset();
    },
    onError: (error) => {
      toast.push(getApiErrorMessage(error, 'We could not send the inquiry. Please try again.'), 'error');
    },
  });

  return (
    <>
      <Seo title="Contact" description="Start a NOVIQ project for brand identity, UI/UX, web development, automation, or 3D landscape design." />
      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="heading mt-4">Start a project</h1>
          <p className="lede mt-4">
            Share enough context for a useful first reply. We review inquiries personally and will not display technical errors on this page.
          </p>
        </div>
        <form className="card p-6 sm:p-8" onSubmit={handleSubmit((values) => mutation.mutate({
          ...values,
          phone: values.phone || null,
          companyName: values.companyName || null,
          expectedDeadline: values.expectedDeadline || null,
          referenceUrl: values.referenceUrl || null,
        }))} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.fullName?.message}>
              <input className="input" {...register('fullName')} autoComplete="name" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className="input" type="email" {...register('email')} autoComplete="email" />
            </Field>
            <Field label="Phone or WhatsApp" error={errors.phone?.message}>
              <input className="input" {...register('phone')} autoComplete="tel" />
            </Field>
            <Field label="Company name" error={errors.companyName?.message}>
              <input className="input" {...register('companyName')} />
            </Field>
            <Field label="Required service" error={errors.requiredService?.message}>
              <select className="input" {...register('requiredService')}>
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>{service.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Estimated budget" error={errors.budgetRange?.message}>
              <select className="input" {...register('budgetRange')}>
                <option value="">Select a range</option>
                {BUDGET_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Expected deadline" error={errors.expectedDeadline?.message}>
              <input className="input" type="date" {...register('expectedDeadline')} />
            </Field>
            <Field label="Reference URL" error={errors.referenceUrl?.message}>
              <input className="input" {...register('referenceUrl')} />
            </Field>
          </div>
          <Field label="Project description" error={errors.projectDescription?.message} className="mt-5">
            <textarea className="input min-h-36" {...register('projectDescription')} />
          </Field>
          <label className="mt-5 flex items-start gap-3 text-sm">
            <input type="checkbox" className="mt-1" {...register('consent')} />
            <span>I consent to NOVIQ storing this inquiry in order to respond to the project request.</span>
          </label>
          {errors.consent ? <p className="field-error">{errors.consent.message}</p> : null}
          <button type="submit" className="btn-primary mt-6" disabled={mutation.isPending}>
            {mutation.isPending ? 'Sending…' : 'Send inquiry'}
          </button>
        </form>
      </section>
    </>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}
