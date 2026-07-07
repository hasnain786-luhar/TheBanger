import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import type { Page } from '../App';

interface LoginPageProps { onNavigate: (page: Page) => void; }

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail]   = useState('');
  const [pw, setPw]         = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate('dashboard'); }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080C14] flex">
      {/* Left panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-brand-700 via-brand-800 to-[#0f172a]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <span className="text-white font-bold text-[15px]">Quotera AI</span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-brand-300" />
            <span className="text-brand-300 text-xs font-bold uppercase tracking-widest">Success Story</span>
          </div>
          <blockquote className="text-white/90 text-xl leading-relaxed mb-6 font-light italic">
            "Quotera AI transformed how I handle proposals. What used to take 2 hours now takes under a minute."
          </blockquote>
          <div className="flex items-center gap-3">
            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=48&h=48&fit=crop" alt="" className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white/20" />
            <div>
              <p className="text-white text-sm font-bold">Ananya Krishnan</p>
              <p className="text-white/50 text-xs">Principal Designer, Studio Ananya</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[{v:'2,400+',l:'Designers'},{v:'₹48Cr',l:'Quotes sent'},{v:'30s',l:'Avg time'}].map(s=>(
            <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-white font-extrabold text-xl">{s.v}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Decorative */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-20 -right-12 w-48 h-48 rounded-full bg-brand-400/10 blur-3xl" />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-[400px] py-6"
        >
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md"><Zap size={15} className="text-white" fill="white" /></div>
            <span className="font-bold text-ink dark:text-white">Quotera<span className="text-brand-600"> AI</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-ink dark:text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-sm text-ink-secondary">Sign in to your Quotera AI account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@studio.com" className="field" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-ink dark:text-slate-200">Password</label>
                <a href="#" className="text-xs text-brand-600 font-semibold hover:text-brand-700">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" className="field pr-11" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink-secondary transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn-primary w-full py-3.5 text-sm gap-2">
              {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <>Sign In <ArrowRight size={15} /></>}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-3 dark:border-slate-800" /></div>
            <div className="relative flex justify-center"><span className="text-xs text-ink-tertiary bg-[#F8FAFC] dark:bg-[#080C14] px-3">or continue with</span></div>
          </div>

          <button className="btn-secondary w-full py-3.5 text-sm gap-3">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-ink-tertiary mt-6">
            No account?{' '}
            <button onClick={() => onNavigate('register')} className="text-brand-600 font-bold hover:text-brand-700">Start free trial</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
