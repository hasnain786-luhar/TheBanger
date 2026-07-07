import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import type { Page } from '../App';

interface RegisterPageProps { onNavigate: (page: Page) => void; }

const perks = [
  'AI-powered quote generation in 30 seconds',
  'Beautiful, brandable PDF proposals',
  'Client management & quote tracking',
  'Analytics dashboard with revenue insights',
  'Unlimited templates for every project type',
];

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', studio: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate('dashboard'); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080C14] flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-[#0D1117] border-r border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-md"><Zap size={15} className="text-white" fill="white" /></div>
          <span className="text-white font-bold text-[15px]">Quotera AI</span>
        </div>

        <div>
          <p className="section-label text-slate-500 mb-6">What you get</p>
          <ul className="space-y-4">
            {perks.map((p, i) => (
              <motion.li key={p} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.08 }} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Check size={10} className="text-white" />
                </div>
                <span className="text-slate-300 text-sm leading-relaxed">{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm rounded-3xl p-5 border border-slate-700/60">
          <p className="text-slate-300 text-sm italic mb-4 leading-relaxed">"I closed 40% more projects since switching to Quotera. The ROI was instant."</p>
          <div className="flex items-center gap-3">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop" alt="" className="w-10 h-10 rounded-2xl object-cover" />
            <div>
              <p className="text-white text-sm font-bold">Vikram Bose</p>
              <p className="text-slate-500 text-xs">Lead Interior Architect</p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-600/8 blur-3xl pointer-events-none" />
      </div>

      {/* Right */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800/40">
              <Check size={11} />14 days free · No credit card
            </div>
            <h1 className="text-2xl font-extrabold text-ink dark:text-white mb-2 tracking-tight">Create your account</h1>
            <p className="text-sm text-ink-secondary">Start generating winning quotes in under a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Riya Desai" className="field" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Studio Name</label>
              <input type="text" value={form.studio} onChange={e=>setForm({...form,studio:e.target.value})} placeholder="Desai Interiors" className="field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Work Email</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="riya@desaiinteriors.com" className="field text-sm" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min. 8 characters" className="field text-sm pr-11" required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink-secondary transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-ink-tertiary">By continuing, you agree to our <a href="#" className="text-brand-600 hover:underline">Terms</a> and <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.</p>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="btn-primary w-full py-3.5 text-sm gap-2">
              {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                : <>Create Free Account <ArrowRight size={15} /></>}
            </motion.button>
          </form>

          <p className="text-center text-sm text-ink-tertiary mt-6">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-brand-600 font-bold hover:text-brand-700">Sign in</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
