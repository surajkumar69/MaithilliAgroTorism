'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Trees, Lock, Mail, KeyRound, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('maithiliagro@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both Email Address and Password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/admin',
      });

      if (res?.error) {
        setError('Invalid credentials. Please enter a valid admin email and password.');
        setLoading(false);
      } else {
        // Successfully authenticated, redirect to Admin CMS Dashboard
        window.location.href = '/admin';
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('An error occurred during authentication. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Branding & Header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-forest-800 flex items-center justify-center mx-auto shadow-xl overflow-hidden p-1.5">
            <Image src="/images/logo.png" alt="Maithili Logo" fill className="object-contain p-1.5" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
              Maithili Agro Tourism
            </h1>
            <p className="text-xs text-earth-300 font-medium tracking-wide uppercase">
              Admin Portal Sign In
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-forest-900/90 border border-forest-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          
          {error && (
            <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs p-4 rounded-2xl flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-earth-200 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-earth-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maithiliagro.com"
                  className="w-full bg-forest-950 border border-forest-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-earth-200 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-earth-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-forest-950 border border-forest-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="pt-4 border-t border-forest-800 text-center">
            <p className="text-[11px] text-earth-300">
              Default Login: <code className="text-accent-gold font-mono">maithiliagro@gmail.com</code> / <code className="text-accent-gold font-mono">password</code>
            </p>
          </div>
        </div>

        {/* Back to Public Site Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-earth-400 hover:text-white transition-colors inline-flex items-center space-x-1"
          >
            <span>← Back to Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
