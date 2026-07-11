'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { login } from '@/features/auth';
import { createSession } from '@/features/auth/server';
import { Surface } from '@/components/ui';

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
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

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Surface className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2 w-full flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-(--text-primary)">Welcome back</h1>

            <p className="text-sm text-(--text-secondary)">Login to access dashboard</p>
          </div>

          <Field label="Email" required error={error}>
            <Input
              type="email"
              placeholder="admin@almaarif.id"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              status={error ? 'error' : 'idle'}
            />
          </Field>

          <Field label="Password" required>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>

          <Button type="submit" className="w-full" status={loading ? 'loading' : 'idle'}>
            Login
          </Button>
        </form>
      </Surface>
    </main>
  );
};
