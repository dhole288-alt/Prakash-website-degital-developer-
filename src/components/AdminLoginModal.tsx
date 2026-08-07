import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, KeyRound, Sparkles, UserCheck, ArrowLeft } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleBackOrClose = () => {
    if (window.history.state?.adminModalOpen) {
      window.history.back();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ adminModalOpen: true }, '');

      const handlePopState = () => {
        onClose();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleBackOrClose();
        }
      };

      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setEmail('prakashdhole965@gmail.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.message || 'Invalid admin email or password.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={handleBackOrClose}
        aria-hidden="true"
      />

      {/* Scroll container for modal */}
      <div className="fixed inset-0 z-10 overflow-y-auto pointer-events-none flex items-center justify-center p-3 sm:p-6">
        <div className="pointer-events-auto bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md my-auto overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Prakash Graphic Designer CRM</h3>
                <p className="text-slate-400 text-xs">Admin Access to Lead Records & Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBackOrClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700/60"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleBackOrClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        <div className="p-6">
          
          {/* Demo Fill Helper Badge */}
          <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-3 mb-6 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-blue-300 font-semibold block">Admin Credentials:</span>
              <span className="text-slate-300 font-mono text-[11px]">prakashdhole965@gmail.com / admin123</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              One-Tap Fill
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-login-email" className="block text-xs font-medium text-slate-300 mb-1">Admin Email</label>
              <input
                id="admin-login-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="prakashdhole965@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="admin-login-pass" className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input
                id="admin-login-pass"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Access Lead CRM Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
);
};
