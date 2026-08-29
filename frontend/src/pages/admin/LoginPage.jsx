import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/admin';
import { loginSchema } from '../../schemas/auth';
import { getApiErrorMessage } from '../../api/client';
import { useAuth } from '../../features/auth/AuthContext';
import Seo from '../../components/common/Seo';
import Logo from '../../components/common/Logo';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } });

  return (
    <>
      <Seo title="Admin login" description="Administrator sign-in for NOVIQ Studio & Solutions." />
      <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
        <form
          className="card w-full max-w-md p-8"
          onSubmit={handleSubmit(async (values) => {
            setError('');
            try {
              const response = await authApi.login(values);
              login(response.accessToken, response.admin);
              navigate('/admin');
            } catch (err) {
              setError(getApiErrorMessage(err, 'Invalid email or password.'));
            }
          })}
          noValidate
        >
          <div className="mb-6 flex w-full justify-center">
            <Logo
              variant="dark"
              className="mx-auto block h-auto w-52 shrink-0 object-contain sm:w-60 md:w-72"
              alt="NOVIQ Studio & Solutions"
            />
          </div>
          <h1 className="font-display text-3xl">Administrator sign in</h1>
          <p className="mt-2 text-sm text-ink-muted">There is no public registration. Only the configured administrator can sign in.</p>
          <label className="label mt-6">Email</label>
          <input className="input" type="email" {...register('email')} />
          {errors.email ? <p className="field-error">{errors.email.message}</p> : null}
          <label className="label mt-4">Password</label>
          <input className="input" type="password" {...register('password')} />
          {errors.password ? <p className="field-error">{errors.password.message}</p> : null}
          {error ? <p className="field-error">{error}</p> : null}
          <button type="submit" className="btn-primary mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </main>
    </>
  );
}
