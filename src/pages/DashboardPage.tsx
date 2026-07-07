import { motion, type Variants } from 'framer-motion';
import {
  TrendingUp, TrendingDown, FileText, CheckCircle, Clock,
  DollarSign, ArrowRight, Zap, ChevronRight, Target, Activity, XCircle, Users
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { quotes, recentActivity, monthlyData } from '../data/mockData';
import type { Page } from '../App';

interface DashboardPageProps { onNavigate: (page: Page) => void; }

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } },
};

/* KPI cards — 4 different accent colors */
const kpiCards = [
  {
    label: 'Revenue MTD',
    value: '₹6.34L',
    change: '+18%',
    trend: 'up' as const,
    icon: DollarSign,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-brand-500 to-brand-700',
    glow: 'shadow-[0_4px_20px_rgba(26,123,255,0.22)]',
    barColor: 'progress-fill-brand',
  },
  {
    label: 'Win Rate',
    value: '68.4%',
    change: '+4%',
    trend: 'up' as const,
    icon: Target,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-600',
    glow: 'shadow-[0_4px_20px_rgba(11,173,160,0.22)]',
    barColor: 'progress-fill-teal',
  },
  {
    label: 'Total Quotes',
    value: '19',
    change: '+3',
    trend: 'up' as const,
    icon: FileText,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-accent-400 to-accent-600',
    glow: 'shadow-[0_4px_20px_rgba(245,168,0,0.22)]',
    barColor: 'progress-fill-gold',
  },
  {
    label: 'Pending',
    value: '5',
    change: '-1',
    trend: 'down' as const,
    icon: Clock,
    iconColor: 'text-white',
    iconBg: 'bg-gradient-to-br from-[#FF8C42] to-[#D45C00]',
    glow: 'shadow-[0_4px_20px_rgba(212,92,0,0.18)]',
    barColor: 'progress-fill-gold',
  },
];

/* Mini sparkline SVG */
function MiniSparkline({ trend, color }: { trend: 'up' | 'down'; color: string }) {
  const data = trend === 'up'
    ? [28, 38, 32, 55, 48, 70, 88]
    : [80, 68, 72, 54, 62, 48, 38];
  const max = Math.max(...data), min = Math.min(...data);
  const w = 64, h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const line = `M ${pts.join(' L ')}`;
  const area = `${line} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-16 h-6" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color}-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${color}-${trend})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Revenue bar chart */
function RevenueChart() {
  const max = Math.max(...monthlyData.map(d => d.revenue));
  return (
    <div className="flex items-end gap-1.5 sm:gap-2 h-28 mt-5">
      {monthlyData.map((d, i) => {
        const pct = Math.max((d.revenue / max) * 100, 6);
        const isLast = i === monthlyData.length - 1;
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 group">
            <div className="w-full flex flex-col justify-end" style={{ height: 90 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.4,0,0.2,1] }}
                className={`w-full rounded-lg transition-all duration-200 ${isLast
                  ? 'bg-gradient-to-t from-brand-700 via-brand-500 to-brand-400 shadow-[0_0_12px_rgba(26,123,255,0.4)]'
                  : 'bg-brand-100 dark:bg-brand-950/60 group-hover:bg-brand-200 dark:group-hover:bg-brand-900/60'}`}
              />
            </div>
            <span className="text-[10px] font-medium text-ink-tertiary">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

const activityConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  quote_accepted:   { icon: CheckCircle, color: 'text-teal-600 dark:text-teal-400',   bg: 'bg-teal-50 dark:bg-teal-900/20' },
  quote_sent:       { icon: FileText,    color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-50 dark:bg-brand-950/60' },
  quote_rejected:   { icon: XCircle,     color: 'text-danger-500',                    bg: 'bg-danger-50 dark:bg-danger-900/15' },
  client_added:     { icon: Users,       color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-amber-900/15' },
  payment_received: { icon: DollarSign,  color: 'text-teal-600 dark:text-teal-400',   bg: 'bg-teal-50 dark:bg-teal-900/20' },
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const recentQuotes = quotes.slice(0, 5);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 sm:space-y-5 lg:space-y-6">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <motion.div variants={item}>
        <div className="relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:p-8 text-white noise"
          style={{
            background: 'linear-gradient(135deg, #001A52 0%, #003A96 45%, #0062E6 80%, #1A7BFF 100%)',
          }}>
          {/* Decorative circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/8" />
          <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full border border-white/8" />
          <div className="absolute right-24 bottom-0 w-32 h-32 rounded-full
            bg-gradient-to-t from-brand-400/20 to-transparent blur-2xl" />
          {/* Gold accent glow */}
          <div className="absolute right-0 top-0 w-48 h-48
            bg-accent-400/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1
                    bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                    <Zap size={10} className="text-accent-300" fill="currentColor" />
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                      AI Powered
                    </span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-1 leading-tight tracking-tight">
                  Welcome back, Riya
                </h2>
                <p className="text-blue-200/70 text-sm">
                  5 pending quotes need attention today.
                </p>
              </div>
              {/* Desktop stats */}
              <div className="hidden sm:flex gap-5 flex-shrink-0">
                {[{label:'Revenue',value:'₹6.34L'},{label:'Win Rate',value:'68.4%'}].map(s => (
                  <div key={s.label} className="text-right">
                    <p className="text-2xl font-black">{s.value}</p>
                    <p className="text-blue-200/60 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile stats row */}
            <div className="flex gap-5 mt-4 sm:hidden">
              {[{v:'₹6.34L',l:'Revenue'},{v:'68.4%',l:'Win Rate'},{v:'7',l:'Active'}].map(s => (
                <div key={s.l}>
                  <p className="text-[17px] font-black">{s.v}</p>
                  <p className="text-blue-200/60 text-xs">{s.l}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: 'Generate Quote',   action: () => onNavigate('quote-editor'),    main: true },
                { label: 'New Proposal',     action: () => onNavigate('proposal-builder'), main: false },
                { label: 'Add Client',       action: () => onNavigate('clients'),           main: false },
              ].map(qa => (
                <motion.button
                  key={qa.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={qa.action}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold min-h-[38px]
                    transition-all duration-200 backdrop-blur-sm
                    ${qa.main
                      ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-brand-900/20'
                      : 'bg-white/12 hover:bg-white/20 border border-white/18 text-white'}`}
                >
                  {qa.label}
                  <ChevronRight size={12} className="opacity-70" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── KPI Cards ── 2-col mobile → 4-col lg ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpiCards.map((kpi, idx) => (
          <motion.div key={kpi.label} variants={item}>
            <Card className={`${kpi.glow} relative overflow-hidden`}>
              {/* Subtle top accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
                style={{ color: kpi.iconBg.includes('brand') ? '#1A7BFF' : kpi.iconBg.includes('teal') ? '#0BADA0' : kpi.iconBg.includes('accent') ? '#F5A800' : '#FF8C42' }}
              />
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl ${kpi.iconBg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <kpi.icon size={18} className={kpi.iconColor} />
                </div>
                <MiniSparkline
                  trend={kpi.trend}
                  color={kpi.iconBg.includes('brand') ? '#1A7BFF' : kpi.iconBg.includes('teal') ? '#0BADA0' : kpi.iconBg.includes('accent') ? '#F5A800' : '#FF8C42'}
                />
              </div>
              <p className="text-xl sm:text-2xl font-black text-ink dark:text-white leading-none">
                {kpi.value}
              </p>
              <p className="text-xs text-ink-secondary mt-1">{kpi.label}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${kpi.trend === 'up' ? 'stat-pill-up' : 'stat-pill-down'} self-start px-0 bg-transparent`}>
                {kpi.trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {kpi.change} this month
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Chart + Outcomes ── stacked mobile → 3-col lg ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink dark:text-white">Revenue Overview</h3>
                <p className="text-xs text-ink-tertiary mt-0.5">Last 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="stat-pill-up"><TrendingUp size={11}/>+22% YoY</span>
              </div>
            </div>
            <RevenueChart />
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <h3 className="text-sm font-bold text-ink dark:text-white mb-0.5">Quote Outcomes</h3>
            <p className="text-xs text-ink-tertiary mb-4">This month</p>
            <div className="space-y-3.5">
              {[
                { label: 'Accepted', count: 14, total: 19, colorClass: 'bg-gradient-to-r from-teal-400 to-teal-600', textColor: 'text-teal-700 dark:text-teal-400' },
                { label: 'Sent',     count: 3,  total: 19, colorClass: 'bg-gradient-to-r from-brand-400 to-brand-600', textColor: 'text-brand-700 dark:text-brand-400' },
                { label: 'Pending',  count: 1,  total: 19, colorClass: 'bg-gradient-to-r from-accent-400 to-accent-600', textColor: 'text-accent-700 dark:text-accent-400' },
                { label: 'Rejected', count: 1,  total: 19, colorClass: 'bg-gradient-to-r from-danger-400 to-danger-600', textColor: 'text-danger-600' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={`font-semibold ${s.textColor}`}>{s.label}</span>
                    <span className="text-ink-tertiary font-medium">{s.count} · {Math.round((s.count/s.total)*100)}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.count/s.total)*100}%` }}
                      transition={{ duration: 0.75, ease: [0.4,0,0.2,1] }}
                      className={`h-full rounded-full ${s.colorClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-surface-3 dark:border-[#1C2B45]">
              {[{l:'Conversion',v:'73.7%',c:'text-teal-600 dark:text-teal-400'},{l:'Avg Value',v:'₹2.46L',c:'text-brand-600 dark:text-brand-400'}].map(m => (
                <div key={m.l} className="text-center p-2.5 rounded-2xl bg-surface-1 dark:bg-[#0F1724]">
                  <p className={`text-lg font-black ${m.c}`}>{m.v}</p>
                  <p className="text-xs text-ink-tertiary mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Recent Quotes + Activity ── stacked → side-by-side lg ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Quotes */}
        <motion.div variants={item}>
          <Card className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-[#1C2B45]">
              <h3 className="text-sm font-bold text-ink dark:text-white">Recent Quotations</h3>
              <button
                onClick={() => onNavigate('quotes')}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors">
                View all <ArrowRight size={12} />
              </button>
            </div>
            {recentQuotes.map((q) => (
              <motion.div
                key={q.id}
                whileTap={{ backgroundColor: 'rgba(248,250,252,0.6)' }}
                className="flex items-center justify-between px-5 py-3.5
                  border-b border-surface-3/40 dark:border-[#1C2B45]/40 last:border-0
                  cursor-pointer hover:bg-surface-1/70 dark:hover:bg-[#0F1724]/60
                  transition-colors"
                onClick={() => onNavigate('quote-editor')}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-2xl flex-shrink-0
                    bg-gradient-to-br from-brand-400 to-brand-600
                    flex items-center justify-center text-white text-sm font-bold
                    shadow-[0_2px_8px_rgba(26,123,255,0.30)]">
                    {q.clientName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink dark:text-slate-100 truncate">{q.clientName}</p>
                    <p className="text-xs text-ink-tertiary truncate">{q.projectName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
                  <p className="text-sm font-black text-ink dark:text-white">
                    ₹{(q.total/1000).toFixed(1)}K
                  </p>
                  <Badge variant={q.status} dot>
                    {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-ink dark:text-white">Activity Feed</h3>
              <Activity size={15} className="text-ink-tertiary" />
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-px
                bg-gradient-to-b from-surface-3 via-surface-3 to-transparent
                dark:from-[#1C2B45] dark:via-[#1C2B45]" />
              <div className="space-y-4">
                {recentActivity.slice(0, 5).map((act, i) => {
                  const cfg = activityConfig[act.type] || activityConfig.quote_sent;
                  return (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3.5 relative"
                    >
                      <div className={`relative z-10 w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bg} shadow-sm`}>
                        <cfg.icon size={14} className={cfg.color} />
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
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
