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
          <div className="rounded-3xl overflow-hidden border border-surface-3 dark:border-slate-800 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.18)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-surface-2 dark:bg-slate-800 border-b border-surface-3 dark:border-slate-700">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
              <div className="flex-1 mx-6 h-7 bg-white dark:bg-slate-700 rounded-xl flex items-center px-3.5 border border-surface-3 dark:border-slate-600">
                <span className="text-xs text-ink-tertiary">app.quotera.ai/dashboard</span>
              </div>
            </div>
            {/* Dashboard mock */}
            <div className="flex bg-surface-1 dark:bg-[#0D1117]" style={{ height: 440 }}>
              {/* Sidebar */}
              <div className="w-48 flex-shrink-0 bg-white dark:bg-[#0D1117] border-r border-surface-3 dark:border-slate-800 flex flex-col py-4 px-3 gap-1">
                <div className="flex items-center gap-2 px-2 pb-3 mb-2 border-b border-surface-3 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm"><Zap size={13} className="text-white" fill="white" /></div>
                  <span className="text-xs font-bold text-ink dark:text-white">Quotera <span className="text-brand-600">AI</span></span>
                </div>
                {['Dashboard','Quotes','Clients','Proposals','Analytics'].map((label, i) => (
                  <div key={label} className={`px-2.5 py-2 rounded-xl text-xs font-semibold ${i === 0 ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400' : 'text-ink-tertiary'}`}>{label}</div>
                ))}
              </div>
              {/* Main */}
              <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <div><p className="text-xs font-bold text-ink dark:text-white">Dashboard</p><p className="text-[10px] text-ink-tertiary">Good morning, Riya 👋</p></div>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold">R</div>
                </div>
                {/* KPIs */}
                <div className="grid grid-cols-4 gap-2.5">
                  {[{l:"Today's",v:'7',c:'text-brand-600'},{l:'Accepted',v:'12',c:'text-emerald-600'},{l:'Pending',v:'5',c:'text-amber-600'},{l:'Revenue',v:'₹6.3L',c:'text-ink dark:text-white'}].map(s=>(
                    <div key={s.l} className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-surface-3 dark:border-slate-800">
                      <p className="text-[9px] text-ink-tertiary mb-1">{s.l}</p>
                      <p className={`text-sm font-bold ${s.c}`}>{s.v}</p>
                    </div>
                  ))}
                </div>
                {/* Charts row */}
                <div className="grid grid-cols-5 gap-2.5 flex-1">
                  <div className="col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-surface-3 dark:border-slate-800 p-3 flex flex-col">
                    <p className="text-[10px] font-bold text-ink dark:text-white mb-2">Revenue Overview</p>
                    <div className="flex-1 flex items-end gap-1.5">
                      {[35,48,28,62,75,90].map((h,i)=>(
                        <div key={i} className="flex-1 rounded-t-lg" style={{ height:`${h}%`, backgroundColor: i===5 ? '#2563eb':'#dbeafe' }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      {['O','N','D','J','F','M'].map(m=><span key={m} className="text-[8px] text-ink-tertiary flex-1 text-center">{m}</span>)}
                    </div>
                  </div>
                  <div className="col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-surface-3 dark:border-slate-800 p-3">
                    <p className="text-[10px] font-bold text-ink dark:text-white mb-2">Recent Quotes</p>
                    {[{n:'Priya S.',a:'₹1.65L',c:'bg-emerald-500'},{n:'Arjun M.',a:'₹3.48L',c:'bg-brand-500'},{n:'Kavya N.',a:'₹3.19L',c:'bg-slate-400'},{n:'Sneha K.',a:'₹6.75L',c:'bg-red-400'}].map(r=>(
                      <div key={r.n} className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-lg bg-brand-100 flex items-center justify-center text-[8px] font-bold text-brand-700">{r.n[0]}</div>
                          <div><p className="text-[9px] font-semibold text-ink dark:text-slate-200">{r.n}</p><span className={`inline-block w-1 h-1 rounded-full ${r.c} mr-1`} /><span className="text-[8px] text-ink-tertiary">Active</span></div>
                        </div>
                        <span className="text-[9px] font-bold text-ink dark:text-slate-300">{r.a}</span>
                      </div>
                    ))}
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
