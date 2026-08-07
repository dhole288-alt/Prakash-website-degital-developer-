import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, KeyRound, UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AdminUser } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'manager'>('admin');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
    setSuccessMsg('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });

      const data = await response.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
        return;
      } else {
        // Check local storage accounts fallback
        const localAccountsRaw = localStorage.getItem('pgd_registered_users');
        if (localAccountsRaw) {
          try {
            const localAccounts = JSON.parse(localAccountsRaw);
            const found = localAccounts.find(
              (u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
            );
            if (found) {
              onLoginSuccess({
                email: found.email,
                name: found.name,
                role: found.role || 'admin',
                token: 'adm_session_local_' + Date.now()
              });
              onClose();
              return;
            }
          } catch (err) {
            // ignore
          }
        }
        setErrorMsg(data.message || 'Invalid admin credentials.');
      }
    } catch (err) {
      // Fallback for network error / standalone client execution
      if (
        (cleanEmail === 'prakashdhole965@gmail.com' || cleanEmail === 'admin@agency.com' || cleanEmail === 'prakash') &&
        (cleanPassword === 'admin123' || cleanPassword === '123456')
      ) {
        onLoginSuccess({
          email: 'prakashdhole965@gmail.com',
          name: 'Prakash Dhole',
          role: 'admin',
          token: 'adm_session_fallback_' + Date.now()
        });
        onClose();
      } else {
        // Check local storage accounts
        const localAccountsRaw = localStorage.getItem('pgd_registered_users');
        if (localAccountsRaw) {
          try {
            const localAccounts = JSON.parse(localAccountsRaw);
            const found = localAccounts.find(
              (u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword
            );
            if (found) {
              onLoginSuccess({
                email: found.email,
                name: found.name,
                role: found.role || 'admin',
                token: 'adm_session_local_' + Date.now()
              });
              onClose();
              return;
            }
          } catch (e) {
            // ignore
          }
        }
        setErrorMsg('Invalid email or password. Please check your credentials or click Sign Up / Register to create an account.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      setErrorMsg('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          role
        })
      });

      const data = await response.json();
      if (data.success && data.user) {
        // Save to local storage cache as well
        saveToLocalStorageUser({ name: cleanName, email: cleanEmail, password: cleanPassword, role });
        setSuccessMsg('Account registered successfully! Logging you in...');
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 800);
        return;
      } else {
        setErrorMsg(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // Local fallback registration
      saveToLocalStorageUser({ name: cleanName, email: cleanEmail, password: cleanPassword, role });
      const newUser: AdminUser = {
        email: cleanEmail,
        name: cleanName,
        role,
        token: 'adm_session_reg_' + Date.now()
      };
      setSuccessMsg('Account registered and saved locally! Logging in...');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 800);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveToLocalStorageUser = (usr: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('pgd_registered_users') || '[]');
      existing.push(usr);
      localStorage.setItem('pgd_registered_users', JSON.stringify(existing));
    } catch (e) {
      // ignore
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

          {/* Mode Switch Tabs (Login / Sign Up) */}
          <div className="bg-slate-950/60 px-5 pt-3 pb-2 border-b border-slate-800/80 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-lg border border-blue-400/30'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400/30'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up / Register</span>
            </button>
          </div>

        <div className="p-6 overflow-y-auto">
          
          {/* Demo Fill Helper Badge (Login Mode) */}
          {activeTab === 'login' && (
            <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-3 mb-6 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-blue-300 font-semibold block">Seeded Admin Credentials:</span>
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
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-login-email" className="block text-xs font-medium text-slate-300 mb-1">
                  Admin Email Address
                </label>
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
                <label htmlFor="admin-login-pass" className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
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
                    <span>Access CRM Dashboard</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMsg('');
                  }}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer underline"
                >
                  Don't have an admin account? Register new user
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-reg-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  id="admin-reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Prakash Dhole"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="admin-reg-email" className="block text-xs font-medium text-slate-300 mb-1">
                  Admin Email Address
                </label>
                <input
                  id="admin-reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your-email@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="admin-reg-pass" className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input
                  id="admin-reg-pass"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Choose a strong password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="admin-reg-role" className="block text-xs font-medium text-slate-300 mb-1">
                  Access Level / Role
                </label>
                <select
                  id="admin-reg-role"
                  value={role}
                  onChange={e => setRole(e.target.value as 'admin' | 'manager')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="admin">Administrator (Full Access & Analytics)</option>
                  <option value="manager">Lead Manager (View & Update Leads)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register & Access CRM</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer underline"
                >
                  Already registered? Back to Login
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  </div>
);
};
