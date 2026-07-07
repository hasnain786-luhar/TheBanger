import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Target, Award } from 'lucide-react';
import { monthlyData, quotes, clients } from '../data/mockData';

const periods = ['3M', '6M', '1Y'] as const;
type Period = typeof periods[number];

const kpis = [
  { label: 'Total Revenue',   value: '₹24.4L', change: '+22%', up: true,  icon: DollarSign, color: 'brand' },
  { label: 'Quotes Sent',     value: '74',      change: '+31%', up: true,  icon: FileText,   color: 'teal'  },
  { label: 'Win Rate',        value: '68.4%',   change: '+4%',  up: true,  icon: Target,     color: 'accent'},
  { label: 'Avg Quote Value', value: '₹2.46L',  change: '+8%',  up: true,  icon: Award,      color: 'brand' },
  { label: 'Active Clients',  value: '28',      change: '+12%', up: true,  icon: Users,      color: 'teal'  },
  { label: 'Overdue Quotes',  value: '3',       change: '-2',   up: false, icon: FileText,   color: 'amber' },
];

const colorMap: Record<string, string> = {
  brand: 'from-brand-500 to-brand-700 shadow-[0_4px_16px_rgba(26,123,255,0.30)]',
  teal:  'from-teal-500 to-teal-700 shadow-[0_4px_16px_rgba(11,173,160,0.28)]',
  accent:'from-accent-500 to-accent-700 shadow-[0_4px_16px_rgba(245,168,0,0.28)]',
  amber: 'from-amber-500 to-orange-600 shadow-[0_4px_16px_rgba(245,158,11,0.28)]',
};

function GradientAreaChart() {
  const data = monthlyData;
  const max = Math.max(...data.map(d => d.revenue));
  const W = 500, H = 120;
  const pad = { l: 48, r: 16, t: 10, b: 28 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;

  const pts = data.map((d, i) => ({
    x: pad.l + (i / (data.length - 1)) * chartW,
    y: pad.t + chartH - (d.revenue / max) * chartH,
    v: d.revenue,
    m: d.month,
  }));

  const smooth = (pts: {x:number;y:number}[]) => {
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], curr = pts[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp2x = curr.x - (curr.x - prev.x) * 0.5;
      d += ` C ${cp1x},${prev.y} ${cp2x},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  };

  const linePath = smooth(pts);
  const areaPath = `${linePath} L ${pts[pts.length-1].x},${H - pad.b} L ${pts[0].x},${H - pad.b} Z`;

  return (
    <div className="relative w-full" style={{ paddingBottom: '28%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A7BFF" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#1A7BFF" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4D9BFF" />
            <stop offset="100%" stopColor="#1A7BFF" />
          </linearGradient>
          <filter id="lineShadow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(r => (
          <line key={r}
            x1={pad.l} y1={pad.t + chartH * r}
            x2={W - pad.r} y2={pad.t + chartH * r}
            stroke="currentColor" strokeWidth="0.5" className="text-surface-3 dark:text-[#1A2B42]" strokeDasharray="4,4" />
        ))}

        {/* Y labels */}
        {[{r:0,l:'6L'},{r:0.5,l:'3L'},{r:1,l:'0'}].map(({r,l}) => (
          <text key={l} x={pad.l - 6} y={pad.t + chartH * r + 4} textAnchor="end"
            className="text-ink-tertiary" fontSize="9" fill="currentColor">{l}</text>
        ))}

        <path d={areaPath} fill="url(#chartGrad)" />
        <motion.path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" filter="url(#lineShadow)"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.4,0,0.2,1] }} />

        {pts.map((p, i) => (
          <g key={i}>
            <motion.circle cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 4}
              fill={i === pts.length - 1 ? '#1A7BFF' : 'white'}
              stroke="#1A7BFF" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }} />
            <text x={p.x} y={H - 2} textAnchor="middle" fontSize="9" fill="currentColor" className="text-ink-tertiary">{p.m}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string; glow: string }[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const cx = 60, cy = 60, r = 44, stroke = 14;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dashArr = circ * pct;
            const dashOff = circ - dashArr + offset * circ / circ;
            const startOff = offset;
            offset += pct;
            return (
              <motion.circle key={i}
                cx={cx} cy={cy} r={r}
                fill="none" stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dashArr} ${circ - dashArr}`}
                strokeDashoffset={-startOff * circ + circ * 0.25}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${dashArr} ${circ - dashArr}` }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.4,0,0.2,1] }}
                style={{ filter: `drop-shadow(0 0 4px ${seg.glow})` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-ink dark:text-white">{total}</span>
          <span className="text-[10px] text-ink-tertiary">total</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-ink-secondary dark:text-slate-400 flex-1">{s.label}</span>
            <span className="text-xs font-bold text-ink dark:text-white">{s.value}</span>
            <span className="text-[10px] text-ink-tertiary w-8 text-right">{Math.round(s.value/total*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('6M');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-ink dark:text-white">Analytics</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">Business performance overview</p>
        </div>
        <div className="flex bg-surface-2 dark:bg-[#0D1828] border border-surface-3 dark:border-[#1A2B42] rounded-2xl p-1">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                period === p
                  ? 'bg-white dark:bg-[#111B2E] text-ink dark:text-white shadow-sm'
                  : 'text-ink-tertiary hover:text-ink dark:hover:text-slate-300'
              }`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className="card group hover:-translate-y-1 hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-300">
              <div className={`w-10 h-10 rounded-2xl mb-3 flex items-center justify-center bg-gradient-to-br ${colorMap[k.color]}`}>
                <k.icon size={18} className="text-white" />
              </div>
              <p className="text-2xl font-black text-ink dark:text-white leading-none">{k.value}</p>
              <p className="text-xs text-ink-secondary mt-1">{k.label}</p>
              <div className={`inline-flex items-center gap-1 mt-2 text-xs font-bold ${k.up ? 'stat-pill-up' : 'stat-pill-down'}`}>
                {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-ink dark:text-white">Revenue Over Time</h3>
            <p className="text-xs text-ink-tertiary mt-0.5">Monthly breakdown — {period}</p>
          </div>
          <span className="stat-pill-up"><TrendingUp size={11} />+22% vs prior</span>
        </div>
        <GradientAreaChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quote Status Donut */}
        <div className="card">
          <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Quote Distribution</h3>
          <DonutChart segments={[
            { label: 'Accepted', value: 14, color: '#10B981', glow: '#10B98180' },
            { label: 'Sent',     value: 3,  color: '#1A7BFF', glow: '#1A7BFF80' },
            { label: 'Pending',  value: 1,  color: '#F59E0B', glow: '#F59E0B80' },
            { label: 'Rejected', value: 1,  color: '#EF4444', glow: '#EF444480' },
          ]} />
        </div>

        {/* Top Clients */}
        <div className="card">
          <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Top Clients by Value</h3>
          <div className="space-y-3">
            {clients.sort((a, b) => b.totalValue - a.totalValue).slice(0, 4).map((c, i) => {
              const max = clients[0]?.totalValue || 1;
              const pct = (c.totalValue / Math.max(...clients.map(cl => cl.totalValue))) * 100;
              return (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-tertiary w-3">{i + 1}</span>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{c.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-ink dark:text-slate-200 truncate">{c.name}</span>
                      <span className="font-bold text-ink dark:text-white ml-2">₹{(c.totalValue/1000).toFixed(0)}K</span>
                    </div>
                    <div className="progress-track">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: [0.4,0,0.2,1] }}
                        className="progress-fill-brand" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
