import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  TrendingUp, TrendingDown, FileText, CheckCircle, Clock,
  DollarSign, ArrowRight, Zap, ChevronRight, Target, Activity,
  XCircle, Users, Star, Bell, Lightbulb, Plus, Send, BarChart3,
  Wand2, Calendar, AlertCircle, Sparkles,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { quotes, recentActivity, monthlyData, clients } from '../data/mockData';
import type { Page } from '../App';

interface DashboardPageProps { onNavigate: (page: Page) => void; }

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

/* Animated counter hook */
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

/* Business Score Ring */
function BusinessScoreRing({ score }: { score: number }) {
  const radius = 44;
  const circ = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);
  useEffect(() => { setTimeout(() => setProgress(score), 300); }, [score]);
  const offset = circ - (progress / 100) * circ;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F5A800' : '#EF4444';
  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-2 dark:text-[#111B2E]" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-ink dark:text-white leading-none">{Math.round(progress)}</span>
        <span className="text-[10px] font-bold text-ink-tertiary mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

/* Area chart */
function AreaChart() {
  const max = Math.max(...monthlyData.map(d => d.revenue));
  const w = 400, h = 100;
  const pts = monthlyData.map((d, i) => ({
    x: (i / (monthlyData.length - 1)) * w,
    y: h - ((d.revenue / max) * (h - 16)) - 8,
  }));
  const linePath = `M ${pts.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;

  return (
    <div className="relative mt-4" style={{ height: h + 24 }}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A7BFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1A7BFF" stopOpacity="0.01" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <motion.path
          d={linePath} fill="none"
          stroke="#1A7BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        />
        {pts.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r="4"
            fill={i === pts.length - 1 ? '#1A7BFF' : 'white'}
            stroke="#1A7BFF" strokeWidth="2"
            filter={i === pts.length - 1 ? 'url(#glow)' : ''}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.06 }}
          />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {monthlyData.map(d => (
          <span key={d.month} className="text-[10px] text-ink-tertiary">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

const activityIcons: Record<string, { Icon: typeof CheckCircle; bg: string; color: string }> = {
  quote_accepted:   { Icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-950/40', color: 'text-emerald-600 dark:text-emerald-400' },
  quote_sent:       { Icon: Send,        bg: 'bg-brand-50 dark:bg-brand-950/50',    color: 'text-brand-600 dark:text-brand-400'    },
  quote_rejected:   { Icon: XCircle,     bg: 'bg-red-50 dark:bg-red-950/40',        color: 'text-red-500 dark:text-red-400'        },
  client_added:     { Icon: Users,       bg: 'bg-amber-50 dark:bg-amber-950/40',    color: 'text-amber-600 dark:text-amber-400'    },
  payment_received: { Icon: DollarSign,  bg: 'bg-teal-50 dark:bg-teal-950/40',     color: 'text-teal-600 dark:text-teal-400'      },
};

const aiInsights = [
  { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30', text: '3 quotes expire in the next 7 days — follow up now.' },
  { icon: TrendingUp,  color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'Your win rate is up 12% compared to last month. Keep it up!' },
  { icon: Star,        color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-950/40', text: 'Kavya Nair hasn\'t been contacted in 14 days. Send a check-in.' },
];

const quickActions = [
  { icon: Plus,      label: 'New Quote',       sub: 'Create in seconds',       page: 'quote-editor'     as Page, grad: 'from-brand-500 to-brand-700',   glow: 'rgba(26,123,255,0.40)' },
  { icon: Users,     label: 'Add Client',      sub: 'Build your directory',    page: 'clients'          as Page, grad: 'from-teal-500 to-teal-700',     glow: 'rgba(11,173,160,0.35)' },
  { icon: Wand2,     label: 'AI Proposal',     sub: 'Auto-generate',           page: 'proposal-builder' as Page, grad: 'from-accent-500 to-accent-700', glow: 'rgba(245,168,0,0.35)'  },
  { icon: BarChart3, label: 'View Analytics',  sub: 'Track performance',       page: 'analytics'        as Page, grad: 'from-[#8B5CF6] to-[#6D28D9]',  glow: 'rgba(139,92,246,0.35)' },
];

const followUps = [
  { client: 'Arjun Mehta',  project: 'Koregaon Park Apartment', days: 2,  amount: '₹3.48L', priority: 'high'   },
  { client: 'Kavya Nair',   project: 'Indiranagar Office',       days: 5,  amount: '₹3.20L', priority: 'medium' },
  { client: 'Sneha Kapoor', project: 'Civil Lines Heritage',      days: 12, amount: '₹1.42L', priority: 'low'   },
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const revenue = useCounter(634000, 1500);
  const winRate = useCounter(68, 1200);
  const totalQuotes = useCounter(19, 900);
  const [insightIdx, setInsightIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setInsightIdx(i => (i + 1) % aiInsights.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5 lg:space-y-6">

      {/* ══ HERO: Welcome + Business Score ══════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="relative overflow-hidden rounded-[28px] noise-overlay"
          style={{ background: 'linear-gradient(135deg, #001240 0%, #003080 40%, #0055D4 75%, #1A7BFF 100%)' }}>
          {/* Decorative */}
          <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(64,150,255,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute left-1/2 bottom-0 w-[200px] h-[150px] opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(245,168,0,0.8) 0%, transparent 70%)', transform: 'translateX(-50%)' }} />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

              {/* Left: Welcome */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1
                    bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                    <Zap size={10} fill="currentColor" className="text-accent-300" />
                    <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">AI Powered</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1
                    bg-emerald-500/20 border border-emerald-400/25 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300">All systems live</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                  Good morning, Riya 👋
                </h2>
                <p className="text-blue-200/70 text-sm sm:text-base">
                  You have <span className="text-white font-bold">5 pending quotes</span> and <span className="text-white font-bold">2 follow-ups</span> due today.
                </p>

                {/* Quick stats inline */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                  {[
                    { label: 'Revenue MTD', value: `₹${(revenue / 100000).toFixed(2)}L`, up: true },
                    { label: 'Win Rate',    value: `${winRate}%`,                         up: true },
                    { label: 'Active Quotes', value: `${totalQuotes}`,                    up: true },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-xl sm:text-2xl font-black text-white">{s.value}</p>
                      <p className="text-[11px] text-blue-200/60 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-2.5 mt-6">
                  {[
                    { label: '+ Create Quote',  action: () => onNavigate('quote-editor'),    primary: true  },
                    { label: 'AI Proposal',      action: () => onNavigate('proposal-builder'), primary: false },
                    { label: 'View Analytics',   action: () => onNavigate('analytics'),        primary: false },
                  ].map(btn => (
                    <motion.button
                      key={btn.label}
                      whileTap={{ scale: 0.95 }}
                      onClick={btn.action}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold
                        transition-all duration-200 min-h-[40px]
                        ${btn.primary
                          ? 'bg-white text-brand-700 hover:bg-blue-50 shadow-lg shadow-brand-900/25'
                          : 'btn-glass text-white text-xs'}`}
                    >
                      {btn.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right: Business Score */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-white/8 border border-white/12 rounded-3xl p-6 backdrop-blur-sm">
                <p className="text-[11px] font-black text-white/60 uppercase tracking-widest">Business Score</p>
                <BusinessScoreRing score={84} />
                <div className="text-center">
                  <p className="text-sm font-bold text-emerald-300">Excellent</p>
                  <p className="text-[11px] text-white/50 mt-0.5">Top 12% of studios</p>
                </div>
                <div className="flex gap-3 text-center">
                  {[{l:'Revenue',v:'+18%'},{l:'Quotes',v:'+22%'},{l:'Clients',v:'+8%'}].map(m => (
                    <div key={m.l}>
                      <p className="text-sm font-black text-white">{m.v}</p>
                      <p className="text-[10px] text-white/40">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══ QUICK ACTIONS GRID ══════════════════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-ink dark:text-white">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((qa, i) => (
            <motion.button
              key={qa.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(qa.page)}
              className="card group text-left transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-dark-hover p-5"
            >
              <div className={`w-11 h-11 rounded-2xl mb-3.5 flex items-center justify-center
                bg-gradient-to-br ${qa.grad}
                shadow-[0_4px_16px_var(--qa-glow)]`}
                style={{ '--qa-glow': qa.glow } as React.CSSProperties}>
                <qa.icon size={20} className="text-white" />
              </div>
              <p className="text-sm font-bold text-ink dark:text-white leading-tight">{qa.label}</p>
              <p className="text-[11px] text-ink-tertiary mt-0.5">{qa.sub}</p>
              <ChevronRight size={14} className="text-ink-tertiary mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ══ AI INSIGHTS ═════════════════════════════════════════════════ */}
      <motion.div variants={fadeUp}>
        <div className="card overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-brand-500 to-teal-500" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink dark:text-white">AI Insights</p>
              <p className="text-[11px] text-ink-tertiary">Powered by GPT-4</p>
            </div>
            <div className="ml-auto flex gap-1">
              {aiInsights.map((_, i) => (
                <button key={i} onClick={() => setInsightIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === insightIdx ? 'bg-brand-500 w-4' : 'bg-surface-3 dark:bg-[#1A2B42]'}`} />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            {aiInsights.map((insight, i) => i === insightIdx && (
              <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-3 p-4 rounded-2xl ${insight.bg}`}>
                <insight.icon size={18} className={`${insight.color} flex-shrink-0 mt-0.5`} />
                <p className="text-sm text-ink dark:text-slate-200 leading-relaxed">{insight.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ══ CHARTS ROW ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

        {/* Revenue Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink dark:text-white">Revenue Trend</h3>
                <p className="text-[11px] text-ink-tertiary mt-0.5">Oct 2024 – Mar 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="stat-pill-up"><TrendingUp size={11} />+22% YoY</span>
              </div>
            </div>
            <AreaChart />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-3 dark:border-[#1A2B42]">
              {[{l:'Total Revenue',v:'₹24.4L',c:'text-brand-600 dark:text-brand-400'},{l:'Avg/Month',v:'₹4.07L',c:'text-teal-600 dark:text-teal-400'},{l:'Best Month',v:'Mar ₹6.34L',c:'text-accent-600 dark:text-accent-400'}].map(m => (
                <div key={m.l}>
                  <p className={`text-base font-black ${m.c}`}>{m.v}</p>
                  <p className="text-[11px] text-ink-tertiary mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quote Outcomes Donut */}
        <motion.div variants={fadeUp}>
          <div className="card h-full flex flex-col">
            <h3 className="text-sm font-bold text-ink dark:text-white mb-1">Quote Outcomes</h3>
            <p className="text-[11px] text-ink-tertiary mb-4">March 2025</p>
            <div className="flex-1 space-y-3">
              {[
                { label: 'Accepted', count: 14, total: 19, cls: 'bg-gradient-to-r from-emerald-400 to-emerald-600', tc: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'Sent',     count: 3,  total: 19, cls: 'bg-gradient-to-r from-brand-400 to-brand-600',    tc: 'text-brand-600 dark:text-brand-400' },
                { label: 'Pending',  count: 1,  total: 19, cls: 'bg-gradient-to-r from-amber-400 to-amber-600',    tc: 'text-amber-600 dark:text-amber-400' },
                { label: 'Rejected', count: 1,  total: 19, cls: 'bg-gradient-to-r from-red-400 to-red-600',        tc: 'text-red-500 dark:text-red-400' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={`font-semibold ${s.tc}`}>{s.label}</span>
                    <span className="text-ink-tertiary">{s.count} · {Math.round(s.count/s.total*100)}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.count/s.total*100}%` }}
                      transition={{ duration: 0.9, ease: [0.4,0,0.2,1] }}
                      className={`h-full rounded-full ${s.cls}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-surface-3 dark:border-[#1A2B42]">
              {[{l:'Conversion',v:'73.7%',c:'text-emerald-600 dark:text-emerald-400'},{l:'Avg Value',v:'₹2.46L',c:'text-brand-600 dark:text-brand-400'}].map(m => (
                <div key={m.l} className="rounded-2xl bg-surface-1 dark:bg-[#0D1828] p-3 text-center">
                  <p className={`text-lg font-black ${m.c}`}>{m.v}</p>
                  <p className="text-[10px] text-ink-tertiary mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══ BOTTOM ROW: Recent + Follow-ups + Activity ══════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

        {/* Recent Quotes */}
        <motion.div variants={fadeUp} className="lg:col-span-1">
          <div className="card !p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-[#1A2B42]">
              <h3 className="text-sm font-bold text-ink dark:text-white">Recent Quotes</h3>
              <button onClick={() => onNavigate('quotes')} className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:gap-2 transition-all">
                All <ArrowRight size={12} />
              </button>
            </div>
            {quotes.slice(0, 4).map(q => (
              <motion.div key={q.id} whileTap={{ scale: 0.99 }}
                onClick={() => onNavigate('quote-editor')}
                className="flex items-center gap-3 px-5 py-3.5 cursor-pointer
                  hover:bg-surface-1 dark:hover:bg-[#0D1828]
                  border-b border-surface-3/40 dark:border-[#1A2B42]/40 last:border-0
                  transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
                  {q.clientName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink dark:text-slate-100 truncate">{q.clientName}</p>
                  <p className="text-xs text-ink-tertiary truncate">{q.projectName}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className="text-sm font-black text-ink dark:text-white">₹{(q.total/1000).toFixed(0)}K</p>
                  <Badge variant={q.status} dot>{q.status[0].toUpperCase() + q.status.slice(1)}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Follow-ups */}
        <motion.div variants={fadeUp}>
          <div className="card h-full">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={15} className="text-amber-500" />
              <h3 className="text-sm font-bold text-ink dark:text-white">Upcoming Follow-ups</h3>
            </div>
            <div className="space-y-3">
              {followUps.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-2xl
                    bg-surface-1 dark:bg-[#0D1828]
                    border border-surface-3 dark:border-[#1A2B42]
                    hover:border-brand-200 dark:hover:border-brand-800 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {f.client[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink dark:text-slate-100 truncate">{f.client}</p>
                    <p className="text-xs text-ink-tertiary truncate">{f.project}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-ink dark:text-slate-200">{f.amount}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                      ${f.priority === 'high'   ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400' :
                        f.priority === 'medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' :
                                                  'bg-surface-2 text-ink-tertiary'}`}>
                      {f.days}d ago
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 rounded-2xl text-xs font-bold
              text-brand-600 dark:text-brand-400
              bg-brand-50 dark:bg-brand-950/30
              border border-brand-100 dark:border-brand-900/50
              hover:bg-brand-100 dark:hover:bg-brand-950/50 transition-colors">
              Send All Follow-ups with AI →
            </button>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div variants={fadeUp}>
          <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-ink dark:text-white">Activity</h3>
              <Activity size={14} className="text-ink-tertiary" />
            </div>
            <div className="relative space-y-3.5">
              <div className="absolute left-[17px] top-2 bottom-2 w-px
                bg-gradient-to-b from-surface-3 via-surface-3/60 to-transparent
                dark:from-[#1A2B42] dark:via-[#1A2B42]/60" />
              {recentActivity.slice(0, 5).map((act, i) => {
                const cfg = activityIcons[act.type] || activityIcons.quote_sent;
                return (
                  <motion.div key={act.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3 relative">
                    <div className={`relative z-10 w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <cfg.Icon size={14} className={cfg.color} />
                    </div>
                    <div className="flex-1 pt-1.5 min-w-0">
                      <p className="text-sm text-ink dark:text-slate-200 leading-snug">{act.message}</p>
                      <p className="text-xs text-ink-tertiary mt-0.5">{act.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
