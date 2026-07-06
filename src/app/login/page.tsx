'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Heart } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const hasUrlError = searchParams.get('error') === 'true';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(
    hasUrlError ? 'Verification link expired or invalid. Please request a new one.' : null
  );

  const supabase = createClient();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const origin = window.location.origin;
      const redirectToUrl = `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectToUrl,
        },
      });

      if (signInError) {
        throw signInError;
      }

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Sign in error:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to send magic link. Please check your email and try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-pink-50 text-[#D4537E] rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            We sent a magic link to <span className="font-semibold text-gray-800">{email}</span>. Click the link to log in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-pink-50 text-[#D4537E] rounded-full flex items-center justify-center mb-2">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Barua</h1>
        <p className="text-sm text-gray-500">
          Enter your email and we&apos;ll send you a magic link.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-xs font-semibold text-gray-600">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#D4537E] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-[#D4537E] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c3436d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending link...' : 'Send magic link'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="text-center">
            <p className="text-sm text-gray-500 font-semibold">Loading login...</p>
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </main>
  );
}
