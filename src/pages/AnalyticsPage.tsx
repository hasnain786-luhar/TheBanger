import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, FileText, CheckCircle, Clock,
  DollarSign, BarChart2, Target, ArrowUpRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { monthlyData } from '../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const stats = [
  { label: 'Total Revenue',   value: '₹24.36L', change: '+18.2%', trend: 'up',   icon: DollarSign,  color: 'text-brand-600',   bg: 'bg-brand-50 dark:bg-brand-900/20' },
  { label: 'Conversion Rate', value: '68.4%',   change: '+4.1%',  trend: 'up',   icon: Target,      color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Accepted',        value: '48',       change: '+7',     trend: 'up',   icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { label: 'Pending',         value: '12',       change: '-3',     trend: 'down', icon: Clock,       color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { label: 'Total Quotes',    value: '70',       change: '+12',    trend: 'up',   icon: FileText,    color: 'text-brand-600',   bg: 'bg-brand-50 dark:bg-brand-900/20' },
  { label: 'Avg Value',       value: '₹2.46L',  change: '+8.3%',  trend: 'up',   icon: BarChart2,   color: 'text-violet-600',  bg: 'bg-violet-50 dark:bg-violet-900/20' },
];

function AreaChart() {
  const data = monthlyData;
  const max = Math.max(...data.map(d => d.revenue));
  const w = 600, h = 140;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.revenue / max) * (h - 20)) - 10;
    return { x, y };
  });
  const pathD = pts.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `C ${pts[i-1].x+50},${pts[i-1].y} ${p.x-50},${p.y} ${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div className="mt-4">
      <svg viewBox={`0 0 ${w} ${h+20}`} className="w-full" preserveAspectRatio="none" style={{ height: 120 }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#ag)" />
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" stroke="#2563eb" strokeWidth="2" />)}
      </svg>
      <div className="flex justify-between px-1 -mt-1">
        {data.map(d => <span key={d.month} className="text-xs text-ink-tertiary flex-1 text-center">{d.month}</span>)}
      </div>
    </div>
  );
}

function DonutChart({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 30, circ = 2 * Math.PI * r, dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#F1F5F9" strokeWidth="7" className="dark:stroke-slate-800" />
          <motion.circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={`0 ${circ}`}
            animate={{ strokeDasharray: `${dash} ${circ}` }}
            transition={{ duration: 1, ease: [0.4,0,0.2,1], delay: 0.3 }}
            strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs sm:text-sm font-bold text-ink dark:text-white">{value}%</span>
        </div>
      </div>
      <p className="text-[10px] sm:text-xs text-ink-tertiary text-center leading-tight">{label}</p>
    </div>
  );
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState<'3m'|'6m'|'1y'>('6m');
  const topClients = [
    { name: 'Kavya Nair',   value: 920000, quotes: 6, rate: 83 },
    { name: 'Sneha Kapoor', value: 675000, quotes: 3, rate: 67 },
    { name: 'Priya Sharma', value: 485000, quotes: 4, rate: 75 },
    { name: 'Arjun Mehta',  value: 320000, quotes: 2, rate: 50 },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 sm:space-y-5 lg:space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">Analytics</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">Performance overview</p>
        </div>
        <div className="flex bg-surface-2 dark:bg-slate-800 rounded-2xl p-1">
          {(['3m','6m','1y'] as const).map(p => (
            <motion.button key={p} onClick={() => setPeriod(p)} whileTap={{ scale: 0.95 }}
              className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${period===p?'text-ink dark:text-white':'text-ink-tertiary'}`}>
              {period===p && <motion.div layoutId="periodPill" className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-sm" transition={{ type:'spring', bounce:0.2 }} />}
              <span className="relative z-10">{p==='3m'?'3M':p==='6m'?'6M':'1Y'}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* KPI: 2-col mobile → 3-col lg */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {stats.map(s => (
          <motion.div key={s.label} variants={item}>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-2xl ${s.bg} flex items-center justify-center`}><s.icon size={16} className={s.color} /></div>
                <span className={`text-xs font-bold flex items-center gap-1 ${s.trend==='up'?'text-emerald-600':'text-red-500'}`}>
                  {s.trend==='up'?<TrendingUp size={11}/>:<TrendingDown size={11}/>}{s.change}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-ink dark:text-white">{s.value}</p>
              <p className="text-xs text-ink-tertiary mt-0.5">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Area chart */}
      <motion.div variants={item}>
        <Card>
          <div className="flex items-center justify-between">
            <div><h3 className="text-sm font-bold text-ink dark:text-white">Monthly Revenue</h3><p className="text-xs text-ink-tertiary">Last 6 months</p></div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full"><TrendingUp size={11}/>+22%</span>
          </div>
          <AreaChart />
        </Card>
      </motion.div>

      {/* Donuts: 2×2 on mobile */}
      <motion.div variants={item}>
        <Card>
          <h3 className="text-sm font-bold text-ink dark:text-white mb-1">Quote Outcomes</h3>
          <p className="text-xs text-ink-tertiary mb-5">Distribution this period</p>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <DonutChart value={68} color="#16a34a" label="Accepted" />
            <DonutChart value={14} color="#dc2626" label="Rejected" />
            <DonutChart value={11} color="#f59e0b" label="Pending" />
            <DonutChart value={7}  color="#94a3b8" label="Expired" />
          </div>
        </Card>
      </motion.div>

      {/* Breakdown + Top clients: stacked mobile → side by side lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <motion.div variants={item}>
          <Card>
            <h3 className="text-sm font-bold text-ink dark:text-white mb-5">Status Breakdown</h3>
            {[{s:'Accepted',n:48,t:70,c:'bg-emerald-500'},{s:'Sent',n:12,t:70,c:'bg-brand-500'},{s:'Rejected',n:7,t:70,c:'bg-red-500'},{s:'Draft',n:2,t:70,c:'bg-slate-300 dark:bg-slate-600'},{s:'Expired',n:1,t:70,c:'bg-amber-400'}].map(row=>(
              <div key={row.s} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-ink dark:text-slate-200">{row.s}</span>
                  <span className="text-ink-tertiary text-xs">{row.n} · {Math.round((row.n/row.t)*100)}%</span>
                </div>
                <div className="h-2 w-full bg-surface-2 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{width:0}} animate={{width:`${(row.n/row.t)*100}%`}} transition={{duration:0.9,ease:[0.4,0,0.2,1]}} className={`h-full rounded-full ${row.c}`} />
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-ink dark:text-white">Top Clients</h3>
              <ArrowUpRight size={15} className="text-ink-tertiary" />
            </div>
            {topClients.map((c, i) => (
              <motion.div key={c.name} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-tertiary w-4">#{i+1}</span>
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">{c.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-slate-200">{c.name}</p>
                    <p className="text-xs text-ink-tertiary">{c.quotes} quotes · {c.rate}%</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-ink dark:text-white">₹{(c.value/1000).toFixed(0)}K</span>
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
