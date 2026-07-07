import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import type { Page } from '../App';

interface RegisterPageProps { onNavigate: (page: Page) => void; }

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [form, setForm] = useState({ name: '', studio: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate('dashboard'); }, 1400);
  };

  const perks = [
    '14-day free trial — no card needed',
    'Unlimited AI quote generation',
    'Beautiful branded PDF proposals',
    'Real-time analytics dashboard',
  ];

  return (
    <div className="min-h-screen flex bg-surface-1 dark:bg-[#060B14]">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(145deg, #00103A 0%, #002580 40%, #0050CC 80%, #1A7BFF 100%)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 80%, rgba(64,150,255,0.5) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(245,168,0,0.6) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="text-xl font-black text-white">Quotera AI</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full mb-4">
              <Sparkles size={12} className="text-accent-300" />
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">Free 14-day trial</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-3">
              Join 2,000+<br />Indian designers.
            </h2>
            <p className="text-blue-200/70 text-lg">
              Close more projects. Earn more. Spend less time on paperwork.
            </p>
          </div>

          <div className="space-y-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} className="text-emerald-400" />
                </div>
                <span className="text-sm text-blue-100/80">{p}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {[{v:'2,000+',l:'Designers'},{v:'₹12Cr+',l:'Revenue Tracked'},{v:'4.9★',l:'App Rating'}].map(s => (
              <div key={s.l}>
                <p className="text-xl font-black text-white">{s.v}</p>
                <p className="text-xs text-blue-200/50 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-200/40 text-xs">© 2025 Quotera AI. Made for Indian designers.</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} className="w-full max-w-[400px]">

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-lg font-black text-ink dark:text-white">Quotera <span className="text-gradient-brand">AI</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-ink dark:text-white mb-1.5">Create your account</h1>
            <p className="text-sm text-ink-secondary">Free 14-day trial. No credit card required.</p>
          </div>

          {/* Google SSO */}
          <motion.button whileTap={{ scale: 0.98 }} type="button"
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl
              bg-white dark:bg-[#111B2E] border border-surface-3 dark:border-[#1A2B42]
              shadow-sm hover:shadow-md text-sm font-semibold text-ink dark:text-slate-200 transition-all mb-5">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </motion.button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-surface-3 dark:bg-[#1A2B42]" />
            <span className="text-xs text-ink-tertiary">or with email</span>
            <div className="flex-1 h-px bg-surface-3 dark:bg-[#1A2B42]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name',   key: 'name',    type: 'text',     placeholder: 'Riya Desai' },
              { label: 'Studio Name', key: 'studio',  type: 'text',     placeholder: 'Riya Design Studio' },
              { label: 'Email',       key: 'email',   type: 'email',    placeholder: 'riya@studio.com' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder} className="field" required />
              </div>
            ))}
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 8 characters" className="field pr-11" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }} className="btn-primary w-full gap-2">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>Creating account...</>
              ) : (<>Start Free Trial <ArrowRight size={16} /></>)}
            </motion.button>
          </form>

          <p className="text-center text-xs text-ink-tertiary mt-4">
            By signing up you agree to our{' '}
            <span className="text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">Terms</span> &{' '}
            <span className="text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <p className="text-center text-sm text-ink-secondary mt-5">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Sign in →
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
