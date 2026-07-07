import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Download, MoreHorizontal, Eye, Edit,
  Trash2, Send, Sparkles, X, ChevronRight, FileText
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { quotes as initialQuotes } from '../data/mockData';
import type { QuoteStatus } from '../types';
import type { Page } from '../App';

interface QuotesPageProps { onNavigate: (page: Page) => void; }

const statusOptions: { value: QuoteStatus | 'all'; label: string }[] = [
  { value: 'all',      label: 'All'      },
  { value: 'draft',    label: 'Draft'    },
  { value: 'sent',     label: 'Sent'     },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'expired',  label: 'Expired'  },
];

function AIModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [gen, setGen]   = useState(false);
  const [form, setForm] = useState({ client: '', project: '', description: '', budget: '' });

  const generate = () => {
    setGen(true);
    setTimeout(() => { setGen(false); setStep(2); }, 2200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.42 }}
        className="relative w-full sm:max-w-lg card rounded-b-none sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-surface-3 dark:bg-slate-700" />
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink dark:text-white">AI Quote Generator</h2>
              <p className="text-xs text-ink-tertiary">Powered by GPT-4</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-2 dark:hover:bg-slate-800 text-ink-tertiary"><X size={16} /></button>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-4">
              {[
                { label: 'Client Name', key: 'client', placeholder: 'e.g. Priya Sharma' },
                { label: 'Project Name', key: 'project', placeholder: 'e.g. Bandra Villa Renovation' },
                { label: 'Budget', key: 'budget', placeholder: '₹2,00,000' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="field" />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Project Brief</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="field resize-none" placeholder="Describe scope, style, materials..." />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={gen || !form.client || !form.project}
                className="btn-primary w-full gap-2">
                {gen ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating...</> : <><Sparkles size={15} />Generate Quote</>}
              </motion.button>
              <div style={{ height: 'env(safe-area-inset-bottom)' }} />
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 mb-5">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0"><span className="text-white font-bold">✓</span></div>
                <div><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Quote generated!</p><p className="text-xs text-emerald-600">6 items · ₹2,14,760</p></div>
              </div>
              <div className="bg-surface-1 dark:bg-slate-800 rounded-2xl p-4 space-y-2 mb-5">
                {[['Client', form.client || 'Client'],['Items','6 line items'],['Subtotal','₹1,82,000'],['GST (18%)','₹32,760'],['Total','₹2,14,760']].map(([k,v])=>(
                  <div key={k} className="flex justify-between text-sm"><span className="text-ink-tertiary">{k}</span><span className="font-semibold text-ink dark:text-slate-200">{v}</span></div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">Regenerate</button>
                <button onClick={onClose} className="btn-primary flex-1">Open Editor →</button>
              </div>
              <div style={{ height: 'env(safe-area-inset-bottom)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Mobile Quote Card ─────────────────────────────────── */
function QuoteCard({ quote, onOpen }: { quote: typeof initialQuotes[0]; onOpen: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="card p-4 cursor-pointer active:shadow-sm transition-all"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm">
            {quote.clientName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink dark:text-white truncate">{quote.clientName}</p>
            <p className="text-xs text-ink-tertiary truncate">{quote.projectName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0" onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
          <MoreHorizontal size={18} className="text-ink-tertiary" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-3 dark:border-slate-800">
        <div>
          <p className="text-xs text-ink-tertiary font-mono">{quote.number}</p>
          <p className="text-xs text-ink-tertiary mt-0.5">{quote.createdAt}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-base font-black text-ink dark:text-white">₹{(quote.total/1000).toFixed(1)}K</span>
          <Badge variant={quote.status} dot>{quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}</Badge>
        </div>
      </div>

      {/* Quick actions */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-surface-3 dark:border-slate-800 flex gap-2"
            onClick={e => e.stopPropagation()}
          >
            {[
              { icon: Eye,      label: 'View' },
              { icon: Edit,     label: 'Edit' },
              { icon: Send,     label: 'Send' },
              { icon: Download, label: 'PDF' },
              { icon: Trash2,   label: 'Delete', danger: true },
            ].map(a => (
              <button key={a.label} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[11px] font-semibold transition-colors ${a.danger ? 'text-danger bg-red-50 dark:bg-red-900/20' : 'text-ink-secondary bg-surface-2 dark:bg-slate-800'}`}>
                <a.icon size={15} />
                {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function QuotesPage({ onNavigate }: QuotesPageProps) {
  const [search, setSearch]           = useState('');
  const [statusFilter, setFilter]     = useState<QuoteStatus | 'all'>('all');
  const [showAI, setShowAI]           = useState(false);

  const filtered = initialQuotes.filter(q => {
    const s = search.toLowerCase();
    return (q.clientName.toLowerCase().includes(s) || q.projectName.toLowerCase().includes(s) || q.number.includes(s))
      && (statusFilter === 'all' || q.status === statusFilter);
  });

  return (
    <div className="space-y-4">
      <AnimatePresence>{showAI && <AIModal onClose={() => setShowAI(false)} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">Quotations</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">{initialQuotes.length} total</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowAI(true)}
            className="flex items-center gap-1.5 h-10 px-3.5 text-xs font-bold text-brand-700 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-2xl">
            <Sparkles size={14} />AI
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => onNavigate('quote-editor')}
            className="btn-primary h-10 px-4 text-xs gap-1.5 min-h-0">
            <Plus size={14} />New
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        <input type="text" placeholder="Search quotes or clients..." value={search} onChange={e => setSearch(e.target.value)} className="field pl-11" />
      </div>

      {/* Status pills — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {statusOptions.map(opt => {
          const count = opt.value === 'all' ? initialQuotes.length : initialQuotes.filter(q => q.status === opt.value).length;
          return (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(opt.value as QuoteStatus | 'all')}
              className={`flex-shrink-0 relative px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${statusFilter === opt.value ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'bg-white dark:bg-slate-900 text-ink-secondary border border-surface-3 dark:border-slate-700'}`}
            >
              {opt.label} <span className={`ml-1 ${statusFilter === opt.value ? 'text-brand-200' : 'text-ink-tertiary'}`}>{count}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ── Mobile: Card list ── Desktop: Table ── */}

      {/* MOBILE CARDS (hidden sm+) */}
      <div className="space-y-3 sm:hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-4">
            <div className="w-16 h-16 rounded-3xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center">
              <FileText size={28} className="text-ink-tertiary" />
            </div>
            <p className="text-sm font-semibold text-ink-secondary">No quotes found</p>
            <button onClick={() => setShowAI(true)} className="text-sm text-brand-600 font-semibold">Generate with AI →</button>
          </div>
        ) : filtered.map(q => (
          <QuoteCard key={q.id} quote={q} onOpen={() => onNavigate('quote-editor')} />
        ))}
      </div>

      {/* DESKTOP TABLE (hidden on mobile) */}
      <div className="hidden sm:block">
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-3 dark:border-slate-800">
                  {['Quote #', 'Client', 'Project', 'Amount', 'Status', 'Date', ''].map(col => (
                    <th key={col} className="px-5 py-4 text-left text-xs font-semibold text-ink-tertiary uppercase tracking-wider whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-3xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center"><FileText size={24} className="text-ink-tertiary" /></div>
                      <p className="text-sm font-semibold text-ink-secondary">No quotes found</p>
                      <button onClick={() => setShowAI(true)} className="text-xs text-brand-600 font-semibold hover:underline">Generate with AI →</button>
                    </div>
                  </td></tr>
                ) : filtered.map(q => (
                  <motion.tr key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                    className="border-b border-surface-3/40 dark:border-slate-800/40 last:border-0 cursor-pointer dark:hover:bg-slate-800/30 transition-colors"
                    onClick={() => onNavigate('quote-editor')}
                  >
                    <td className="px-5 py-4"><span className="text-xs font-mono font-bold text-ink-tertiary">{q.number}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">{q.clientName[0]}</div>
                        <span className="text-sm font-semibold text-ink dark:text-slate-100">{q.clientName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-sm text-ink-secondary max-w-[180px] truncate block">{q.projectName}</span></td>
                    <td className="px-5 py-4"><span className="text-sm font-bold text-ink dark:text-white">₹{q.total.toLocaleString('en-IN')}</span></td>
                    <td className="px-5 py-4"><Badge variant={q.status} dot>{q.status.charAt(0).toUpperCase() + q.status.slice(1)}</Badge></td>
                    <td className="px-5 py-4"><span className="text-xs text-ink-tertiary">{q.createdAt}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {[{icon: Eye, label: 'View'}, {icon: Edit, label: 'Edit'}, {icon: Send, label: 'Send'}].map(a => (
                          <motion.button key={a.label} whileTap={{ scale: 0.9 }} title={a.label} onClick={e => { e.stopPropagation(); onNavigate('quote-editor'); }}
                            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-2 dark:hover:bg-slate-800 text-ink-tertiary transition-colors">
                            <a.icon size={14} />
                          </motion.button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-5 py-3.5 border-t border-surface-3 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-ink-tertiary">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              <div className="flex gap-2">
                {['Previous', 'Next'].map(l => (
                  <button key={l} className="px-4 py-2 text-xs font-semibold rounded-xl border border-surface-3 dark:border-slate-700 text-ink-secondary hover:bg-surface-2 transition-colors">{l}</button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
