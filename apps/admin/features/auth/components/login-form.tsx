'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { login } from '@/features/auth';
import { createSession } from '@/features/auth/server';
import { Surface } from '@/components/ui';
import { Logo } from '@almaarif/brand';

type FieldErrors = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!password) {
      errors.password = 'Password wajib diisi';
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const user = await login(email, password);

      await createSession(user);

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.length > 0;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Surface className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="mb-6 flex justify-center">
            <Logo width={160} height={50} />
          </div>

          <div className="space-y-2 w-full flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-(--text-primary)">Welcome back</h1>

            <p className="text-sm text-(--text-secondary)">Login to access dashboard</p>
          </div>

          <Field label="Email" required error={fieldErrors.email}>
            <Input
              type="email"
              placeholder="admin@almaarif.id"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              status={fieldErrors.email ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Password" required error={fieldErrors.password}>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              status={fieldErrors.password ? 'error' : 'idle'}
            />
          </Field>

          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit}
            status={loading ? 'loading' : 'idle'}
          >
            Login
          </Button>
        </form>
      </Surface>
    </main>
  );
};
