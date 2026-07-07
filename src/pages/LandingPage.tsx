import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Check, Star, Play, Menu, X, Sparkles, Clock, TrendingUp, FileText, Users, BarChart3 } from 'lucide-react';
import { testimonials, pricingPlans } from '../data/mockData';
import type { Page } from '../App';

interface LandingPageProps { onNavigate: (page: Page) => void; }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080C14] text-ink dark:text-slate-100 overflow-x-hidden">

      {/* ── Navbar ───────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-xl shadow-sm border-b border-surface-3/60 dark:border-slate-800' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md">
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="text-[15px] font-bold text-ink dark:text-white">Quotera<span className="text-brand-600"> AI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Testimonials'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-ink-secondary hover:text-ink dark:hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onNavigate('login')} className="btn-ghost text-sm">Sign In</button>
            <button onClick={() => onNavigate('register')} className="btn-primary text-sm">Start Free</button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-surface-2 transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatedMobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={onNavigate} />
      </motion.nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-400/10 dark:bg-brand-600/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-full text-xs font-bold mb-8 border border-brand-100 dark:border-brand-800/60">
              <Sparkles size={12} />
              Now with GPT-4 Powered Proposals
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-ink dark:text-white leading-[1.06] mb-6">
            Create Winning<br />
            <span className="text-brand-600">Quotations</span> in Seconds.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl text-ink-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            AI creates beautiful quotations, proposals and follow-ups for interior designers. Win more projects. Spend less time on paperwork.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('register')}
              className="btn-primary text-base px-8 py-3.5 gap-2.5 shadow-xl shadow-brand-600/20"
            >
              Start Free — No card required
              <ArrowRight size={17} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-secondary text-base px-8 py-3.5 gap-2.5"
            >
              <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Play size={9} fill="white" className="ml-0.5 text-white" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 text-sm text-ink-tertiary">
            <div className="flex -space-x-2">
              {['774909','220453','1130626','1222271'].map((id, i) => (
                <img key={i} src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=32&h=32&fit=crop`} alt="" className="w-8 h-8 rounded-full border-2 border-[#F8FAFC] dark:border-[#080C14] object-cover" />
              ))}
            </div>
            <span>Trusted by <strong className="text-ink dark:text-white">2,400+</strong> interior designers</span>
          </motion.div>
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto mt-16 relative"
        >
          {/* Glow under the mockup */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative rounded-[28px] overflow-hidden border border-surface-3/80 dark:border-slate-800 shadow-[0_48px_120px_-20px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#F1F5F9] dark:bg-[#0A1020] border-b border-surface-3 dark:border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"/>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"/>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"/>
              </div>
              <div className="flex-1 mx-4 h-6 bg-white dark:bg-[#111B2E] rounded-lg flex items-center gap-2 px-3 border border-surface-3 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-[11px] text-ink-tertiary">app.quotera.ai/dashboard</span>
              </div>
            </div>

            {/* Dashboard mock — matches new design */}
            <div className="flex bg-[#F8FAFC] dark:bg-[#060B14]" style={{ height: 460 }}>

              {/* Sidebar */}
              <div className="w-44 flex-shrink-0 bg-white dark:bg-[#070C18] border-r border-surface-3/70 dark:border-[#0F1D30] flex flex-col py-3 px-2.5 gap-0.5">
                {/* Logo */}
                <div className="flex items-center gap-2 px-2 pb-2.5 mb-1.5 border-b border-surface-3/60 dark:border-[#0F1D30]">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Zap size={11} className="text-white" fill="white" />
                  </div>
                  <span className="text-[11px] font-black text-ink dark:text-white">Quotera<span className="text-brand-600"> AI</span></span>
                </div>
                {/* Search */}
                <div className="mx-1 mb-1 h-6 bg-surface-2 dark:bg-[#0D1828] border border-surface-3 dark:border-[#1A2B42] rounded-lg flex items-center gap-1.5 px-2">
                  <div className="w-2.5 h-2.5 text-ink-tertiary flex-shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-tertiary w-full h-full"><circle cx="7" cy="7" r="4"/><path d="m10 10 3 3"/></svg>
                  </div>
                  <span className="text-[9px] text-ink-tertiary flex-1">Search...</span>
                  <span className="text-[8px] text-ink-tertiary font-mono opacity-60">⌘K</span>
                </div>
                {/* Nav items */}
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Quotes',    active: false },
                  { label: 'Clients',   active: false },
                  { label: 'Proposals', active: false },
                  { label: 'Analytics', active: false },
                ].map(item => (
                  <div key={item.label}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-colors
                      ${item.active
                        ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300'
                        : 'text-ink-tertiary'}`}
                  >
                    <div className={`w-3 h-3 rounded-md flex-shrink-0 ${item.active ? 'bg-brand-200 dark:bg-brand-800' : 'bg-surface-2 dark:bg-[#111B2E]'}`} />
                    {item.label}
                    {item.active && <div className="ml-auto w-1 h-1 rounded-full bg-brand-500" />}
                  </div>
                ))}

                {/* AI Banner */}
                <div className="mt-auto mx-1 rounded-xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(135deg, #001240 0%, #003280 50%, #0052CC 100%)' }}>
                  <div className="p-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles size={8} className="text-accent-300" />
                      <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">AI Copilot</span>
                    </div>
                    <p className="text-[8px] text-blue-200/60 mb-1.5 leading-tight">Generate a quote in 30 seconds.</p>
                    <div className="w-full text-[8px] font-bold text-white py-1 rounded-lg bg-white/10 border border-white/15 text-center">Try Now →</div>
                  </div>
                </div>

                {/* User chip */}
                <div className="mt-2 mx-1 flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-surface-1 dark:bg-[#0D1828] border border-surface-3 dark:border-[#1A2B42]">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-[8px] font-black flex-shrink-0">R</div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-ink dark:text-white truncate leading-none">Riya Desai</p>
                    <p className="text-[8px] text-ink-tertiary leading-none mt-0.5">Pro Plan</p>
                  </div>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <div className="h-10 flex items-center justify-between px-4 bg-white/80 dark:bg-[#060B14]/80 border-b border-surface-3/60 dark:border-[#0F1D30] flex-shrink-0">
                  <div>
                    <p className="text-[10px] font-bold text-ink dark:text-white leading-none">Dashboard</p>
                    <p className="text-[8px] text-ink-tertiary leading-none mt-0.5">Monday, July 7, 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 px-2.5 bg-gradient-to-b from-[#4096FF] to-[#0057E3] rounded-lg flex items-center gap-1">
                      <span className="text-[8px] font-bold text-white">+ New Quote</span>
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-[9px] font-bold">R</div>
                  </div>
                </div>

                {/* Page content */}
                <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2.5">

                  {/* Hero banner */}
                  <div className="rounded-2xl p-3.5 relative overflow-hidden flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #001240 0%, #003080 40%, #0055D4 75%, #1A7BFF 100%)' }}>
                    <div className="absolute right-0 top-0 w-24 h-24 rounded-full opacity-20"
                      style={{ background: 'radial-gradient(circle, rgba(64,150,255,0.7) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                    <p className="text-[10px] font-black text-white mb-0.5">Good morning, Riya 👋</p>
                    <p className="text-[8px] text-blue-200/70 mb-2">5 pending quotes need attention today.</p>
                    <div className="flex gap-3">
                      {[{l:'Revenue',v:'₹6.34L'},{l:'Win Rate',v:'68%'},{l:'Quotes',v:'19'}].map(s=>(
                        <div key={s.l}>
                          <p className="text-[11px] font-black text-white leading-none">{s.v}</p>
                          <p className="text-[8px] text-blue-200/60 leading-none mt-0.5">{s.l}</p>
                        </div>
                      ))}
                      {/* Score ring preview */}
                      <div className="ml-auto flex flex-col items-center bg-white/8 border border-white/12 rounded-xl px-2 py-1">
                        <p className="text-[7px] font-black text-white/60 uppercase tracking-wide mb-0.5">Score</p>
                        <p className="text-base font-black text-white leading-none">84</p>
                        <p className="text-[7px] text-emerald-300 font-bold">Excellent</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
                    {[
                      { label: 'New Quote',  g: 'from-brand-500 to-brand-700'  },
                      { label: 'Add Client', g: 'from-teal-500 to-teal-700'    },
                      { label: 'AI Proposal',g: 'from-accent-500 to-amber-600' },
                      { label: 'Analytics',  g: 'from-[#8B5CF6] to-[#6D28D9]' },
                    ].map(qa => (
                      <div key={qa.label} className="bg-white dark:bg-[#0D1526] rounded-xl border border-surface-3 dark:border-[#1A2B42] p-2 flex flex-col gap-1">
                        <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${qa.g} flex items-center justify-center shadow-sm`}>
                          <div className="w-2 h-2 bg-white/70 rounded-sm" />
                        </div>
                        <p className="text-[8px] font-bold text-ink dark:text-white leading-tight">{qa.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charts + activity row */}
                  <div className="grid grid-cols-5 gap-2 flex-1 min-h-0">
                    {/* Area chart */}
                    <div className="col-span-3 bg-white dark:bg-[#0D1526] rounded-2xl border border-surface-3 dark:border-[#1A2B42] p-2.5 flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[9px] font-bold text-ink dark:text-white">Revenue Trend</p>
                        <span className="text-[7px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">+22%</span>
                      </div>
                      {/* Mini area chart SVG */}
                      <div className="flex-1 relative min-h-0">
                        <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1A7BFF" stopOpacity="0.25"/>
                              <stop offset="100%" stopColor="#1A7BFF" stopOpacity="0.01"/>
                            </linearGradient>
                          </defs>
                          {/* Grid */}
                          {[15,30,45].map(y=>(
                            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3,3"/>
                          ))}
                          {/* Area */}
                          <path d="M0,48 C33,42 66,38 100,25 C133,12 166,8 200,4 L200,60 L0,60 Z" fill="url(#heroAreaGrad)"/>
                          {/* Line */}
                          <path d="M0,48 C33,42 66,38 100,25 C133,12 166,8 200,4" fill="none" stroke="#1A7BFF" strokeWidth="1.8" strokeLinecap="round"/>
                          {/* End dot */}
                          <circle cx="200" cy="4" r="3" fill="#1A7BFF" stroke="white" strokeWidth="1.2"/>
                        </svg>
                      </div>
                      {/* Month labels */}
                      <div className="flex justify-between mt-1">
                        {['Oct','Nov','Dec','Jan','Feb','Mar'].map(m=>(
                          <span key={m} className="text-[7px] text-ink-tertiary">{m}</span>
                        ))}
                      </div>
                    </div>

                    {/* Recent quotes */}
                    <div className="col-span-2 bg-white dark:bg-[#0D1526] rounded-2xl border border-surface-3 dark:border-[#1A2B42] p-2.5 flex flex-col overflow-hidden">
                      <p className="text-[9px] font-bold text-ink dark:text-white mb-1.5">Recent Quotes</p>
                      <div className="space-y-1.5 flex-1">
                        {[
                          { n:'Priya S.',  a:'₹1.65L', s:'accepted', c:'bg-emerald-500' },
                          { n:'Arjun M.',  a:'₹3.48L', s:'sent',     c:'bg-brand-500'   },
                          { n:'Kavya N.',  a:'₹3.20L', s:'draft',    c:'bg-slate-400'   },
                          { n:'Sneha K.',  a:'₹1.42L', s:'rejected', c:'bg-red-400'     },
                        ].map(r => (
                          <div key={r.n} className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0">{r.n[0]}</div>
                              <div>
                                <p className="text-[8px] font-semibold text-ink dark:text-slate-200 leading-none">{r.n}</p>
                                <div className="flex items-center gap-0.5 mt-0.5">
                                  <span className={`w-1 h-1 rounded-full ${r.c}`}/>
                                  <span className="text-[7px] text-ink-tertiary capitalize">{r.s}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-[8px] font-bold text-ink dark:text-slate-200">{r.a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-16 border-y border-surface-3 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[{v:'2,400+',l:'Designers'},{v:'₹48Cr+',l:'Quotes Generated'},{v:'30s',l:'Avg. Quote Time'},{v:'40%',l:'More Conversions'}].map(s=>(
            <div key={s.l}>
              <p className="text-3xl font-extrabold text-ink dark:text-white mb-1">{s.v}</p>
              <p className="text-sm text-ink-tertiary">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <p className="section-label mb-3">Features</p>
            <h2 className="text-4xl font-extrabold text-ink dark:text-white mb-4 tracking-tight">Everything you need to win more projects</h2>
            <p className="text-lg text-ink-secondary max-w-xl mx-auto">Built specifically for interior designers — not a generic tool.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Sparkles, title: 'AI Quote Generation',    desc: 'Describe your project and AI crafts a complete, professional quotation in under 30 seconds. Interior design language, built in.', color: 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' },
              { icon: FileText, title: 'Beautiful Proposals',    desc: 'Generate stunning branded proposals your clients will love. Custom logo, signature, bank details — all beautifully laid out.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Clock,    title: 'Quote Tracking',         desc: 'Know exactly when clients view your quotes. Get notified on opens, follow up at the right moment, and close faster.', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
              { icon: Users,    title: 'Client Management',      desc: 'Centralize every client, project, and quote. Full history at your fingertips. Never lose track of a conversation again.', color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20' },
              { icon: TrendingUp,'title':'Revenue Analytics',   desc: 'Track conversion rates, revenue trends, and project pipeline. Data-driven insights to grow your design business.', color: 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' },
              { icon: BarChart3, title: 'Smart Templates',       desc: 'Start from battle-tested templates for living rooms, kitchens, offices, and more. Customize once, use forever.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.07 }}>
                <motion.div whileHover={{ y:-4 }} transition={{ duration:0.2 }} className="card p-6 h-full">
                  <div className={`w-11 h-11 rounded-3xl ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-ink dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-6 bg-white dark:bg-[#0D1117] border-y border-surface-3 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <p className="section-label mb-3">Testimonials</p>
            <h2 className="text-4xl font-extrabold text-ink dark:text-white mb-4 tracking-tight">Loved by designers across India</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}>
                <motion.div whileHover={{ y:-3 }} transition={{ duration:0.2 }} className="card p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_,i) => <Star key={i} size={14} fill="#f59e0b" className="text-amber-400" />)}
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-bold text-ink dark:text-white">{t.name}</p>
                      <p className="text-xs text-ink-tertiary">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="text-4xl font-extrabold text-ink dark:text-white mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-ink-secondary">14-day free trial. No credit card required.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1 }}>
                <div className={`relative rounded-3xl p-7 border transition-all ${plan.highlighted
                  ? 'bg-gradient-to-b from-brand-600 to-brand-800 border-brand-600 shadow-2xl shadow-brand-600/20 text-white'
                  : 'card hover:shadow-lg'}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-ink text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Most Popular</span>
                    </div>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.highlighted ? 'text-brand-200' : 'text-ink-tertiary'}`}>{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-ink dark:text-white'}`}>₹{plan.price.toLocaleString()}</span>
                    <span className={`text-sm ${plan.highlighted ? 'text-brand-300' : 'text-ink-tertiary'}`}>/mo</span>
                  </div>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-brand-200' : 'text-ink-secondary'}`}>{plan.description}</p>
                  <button
                    onClick={() => onNavigate('register')}
                    className={`w-full py-3 rounded-2xl text-sm font-bold mb-6 transition-all ${plan.highlighted ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-sm' : 'btn-primary'}`}
                  >
                    {plan.cta}
                  </button>
                  <ul className="space-y-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-brand-500' : 'bg-brand-100 dark:bg-brand-900/30'}`}>
                          <Check size={9} className={plan.highlighted ? 'text-white' : 'text-brand-600'} />
                        </div>
                        <span className={plan.highlighted ? 'text-brand-100' : 'text-ink-secondary'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-ink dark:text-white mb-4 tracking-tight">Ready to close more projects?</h2>
          <p className="text-lg text-ink-secondary mb-10">Join 2,400+ interior designers growing their business with Quotera AI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => onNavigate('register')} className="btn-primary text-base px-8 py-3.5 gap-2 shadow-xl shadow-brand-600/20">
              Start Free Trial <ArrowRight size={16} />
            </motion.button>
            <button onClick={() => onNavigate('login')} className="btn-secondary text-base px-8 py-3.5">Sign In</button>
          </div>
          <p className="text-xs text-ink-tertiary mt-6">14-day free trial · No credit card · Cancel anytime</p>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-surface-3 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md">
                  <Zap size={13} className="text-white" fill="white" />
                </div>
                <span className="text-sm font-bold text-ink dark:text-white">Quotera<span className="text-brand-600"> AI</span></span>
              </div>
              <p className="text-sm text-ink-secondary max-w-xs leading-relaxed">Create winning quotations in seconds. Built for interior designers who want to grow.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal',   links: ['Privacy', 'Terms', 'Security'] },
            ].map(g => (
              <div key={g.title}>
                <h4 className="section-label mb-4">{g.title}</h4>
                <ul className="space-y-2.5">
                  {g.links.map(l => <li key={l}><a href="#" className="text-sm text-ink-secondary hover:text-ink dark:hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-surface-3 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink-tertiary">© 2024 Quotera AI. All rights reserved.</p>
            <p className="text-xs text-ink-tertiary">Made with care for interior designers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AnimatedMobileMenu({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (page: Page) => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-[#0D1117] border-b border-surface-3 dark:border-slate-800 px-6 py-4 space-y-3"
        >
          {['Features', 'Pricing', 'Testimonials'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={onClose} className="block text-sm font-semibold text-ink-secondary py-1">{l}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={() => { onNavigate('login'); onClose(); }} className="btn-secondary flex-1 text-sm">Sign In</button>
            <button onClick={() => { onNavigate('register'); onClose(); }} className="btn-primary flex-1 text-sm">Start Free</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
