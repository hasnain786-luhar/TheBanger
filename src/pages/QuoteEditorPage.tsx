import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Sparkles, Download, Send, Eye, ArrowLeft,
  ArrowRight, RefreshCw, Wand2, ChevronDown, FileText, Zap, Check
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import type { Page } from '../App';

interface QuoteEditorPageProps { onNavigate: (page: Page) => void; }

interface LineItem {
  id: string; description: string; quantity: number; unit: string; unitPrice: number;
}

const defaultItems: LineItem[] = [
  { id: '1', description: 'Living Room Sofa Set (Italian Leather)', quantity: 1,  unit: 'set',   unitPrice: 85000 },
  { id: '2', description: 'Custom Curtains & Drapes',               quantity: 6,  unit: 'panel', unitPrice: 4500  },
  { id: '3', description: 'Interior Design Consultation',           quantity: 10, unit: 'hrs',   unitPrice: 3500  },
];

const wizardSteps = [
  { id: 1, label: 'Details',  icon: FileText },
  { id: 2, label: 'Items',    icon: Plus },
  { id: 3, label: 'Preview',  icon: Eye },
  { id: 4, label: 'Generate', icon: Download },
];

export function QuoteEditorPage({ onNavigate }: QuoteEditorPageProps) {
  const [items, setItems]         = useState<LineItem[]>(defaultItems);
  const [client, setClient]       = useState('Priya Sharma');
  const [project, setProject]     = useState('Bandra Villa Renovation');
  const [discount, setDiscount]   = useState(7000);
  const [gstRate, setGstRate]     = useState(18);
  const [notes, setNotes]         = useState('All items subject to availability. Delivery within 6–8 weeks.');
  const [terms, setTerms]         = useState('50% advance on confirmation, 50% on delivery. Valid 30 days.');
  const [desktopTab, setDesktop]  = useState<'edit' | 'preview'>('edit');
  const [mobileStep, setMobile]   = useState(1); // 1–4
  const [aiLoading, setAI]        = useState(false);

  const subtotal  = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const taxable   = subtotal - discount;
  const gstAmt    = (taxable * gstRate) / 100;
  const total     = taxable + gstAmt;

  const updateItem = (id: string, f: keyof LineItem, v: string | number) =>
    setItems(items.map(i => i.id === id ? { ...i, [f]: v } : i));

  /* ── Shared Preview component ────────────────────── */
  const PreviewContent = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md"><Zap size={16} className="text-white" fill="white" /></div>
            <div><p className="text-sm font-bold text-ink dark:text-white">Your Design Studio</p><p className="text-xs text-ink-tertiary">Interior Design</p></div>
          </div>
          <p className="text-xs text-ink-tertiary">GSTIN: 27AABCU9603R1ZX</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black text-brand-600">QUOTATION</h2>
          <p className="text-xs font-mono text-ink-tertiary"># QT-2024-001</p>
          <p className="text-xs text-ink-tertiary mt-1">1 March 2024</p>
        </div>
      </div>

      <div className="bg-surface-1 dark:bg-slate-800/60 rounded-2xl p-4">
        <p className="section-label mb-1.5">Bill To</p>
        <p className="text-sm font-bold text-ink dark:text-white">{client}</p>
        <p className="text-sm text-ink-secondary">{project}</p>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[400px]">
          <thead><tr className="bg-surface-2 dark:bg-slate-800 text-xs font-bold text-ink-secondary uppercase">
            <th className="px-3 py-2.5 text-left rounded-l-xl">Description</th>
            <th className="px-3 py-2.5 text-center">Qty</th>
            <th className="px-3 py-2.5 text-right">Rate</th>
            <th className="px-3 py-2.5 text-right rounded-r-xl">Total</th>
          </tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-surface-3/50 dark:border-slate-800/50 last:border-0">
                <td className="px-3 py-3 text-sm text-ink dark:text-slate-200">{item.description || '—'}</td>
                <td className="px-3 py-3 text-xs text-center text-ink-secondary">{item.quantity} {item.unit}</td>
                <td className="px-3 py-3 text-sm text-right text-ink-secondary">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                <td className="px-3 py-3 text-sm font-bold text-right text-ink dark:text-slate-200">₹{(item.quantity*item.unitPrice).toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-56 space-y-2">
          {[
            { l: 'Subtotal', v: `₹${subtotal.toLocaleString('en-IN')}` },
            { l: 'Discount', v: `-₹${discount.toLocaleString('en-IN')}`, c: 'text-danger' },
            { l: `GST (${gstRate}%)`, v: `₹${gstAmt.toLocaleString('en-IN')}` },
          ].map(r => (
            <div key={r.l} className="flex justify-between text-sm">
              <span className="text-ink-secondary">{r.l}</span>
              <span className={`font-semibold ${(r as any).c || 'text-ink dark:text-slate-200'}`}>{r.v}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t-2 border-surface-3 dark:border-slate-700">
            <span className="font-bold text-ink dark:text-white">Total</span>
            <span className="text-xl font-black text-brand-600">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      {notes && <div className="pt-4 border-t border-surface-3 dark:border-slate-800"><p className="section-label mb-1">Notes</p><p className="text-sm text-ink-secondary">{notes}</p></div>}
    </div>
  );

  /* ── Mobile wizard step content ──────────────────── */
  const MobileStep1 = () => (
    <div className="space-y-4">
      <p className="text-xs text-ink-tertiary font-semibold uppercase tracking-widest">Client & Project</p>
      {[
        { label: 'Client Name', value: client, setter: setClient, placeholder: 'Client name' },
        { label: 'Project Name', value: project, setter: setProject, placeholder: 'Project name' },
      ].map(f => (
        <div key={f.label}>
          <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
          <input value={f.value} onChange={e => f.setter(e.target.value)} className="field" placeholder={f.placeholder} />
        </div>
      ))}
      <div>
        <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Quote Date</label>
        <input type="date" defaultValue="2024-03-01" className="field" />
      </div>
      <div>
        <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Valid Until</label>
        <input type="date" defaultValue="2024-03-31" className="field" />
      </div>
    </div>
  );

  const MobileStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-tertiary font-semibold uppercase tracking-widest">Line Items</p>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setAI(true); setTimeout(() => setAI(false), 1600); }}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-700">
          {aiLoading ? <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <Sparkles size={12} />}
          AI Improve
        </motion.button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start gap-2 mb-3">
              <div className="flex-1">
                <label className="text-xs text-ink-tertiary mb-1 block">Description</label>
                <input value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="field-sm" placeholder="Item description" />
              </div>
              <button onClick={() => items.length > 1 && setItems(items.filter(i => i.id !== item.id))} className="mt-5 w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-danger flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-ink-tertiary mb-1 block">Qty</label>
                <input type="number" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="field-sm text-center" />
              </div>
              <div>
                <label className="text-xs text-ink-tertiary mb-1 block">Unit</label>
                <input value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} className="field-sm" />
              </div>
              <div>
                <label className="text-xs text-ink-tertiary mb-1 block">Rate (₹)</label>
                <input type="number" value={item.unitPrice} onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="field-sm text-right" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-surface-3 dark:border-slate-700">
              <span className="text-xs text-ink-tertiary">Subtotal</span>
              <span className="text-sm font-bold text-ink dark:text-white">₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unit: 'unit', unitPrice: 0 }])}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-brand-200 dark:border-brand-800 text-sm font-semibold text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors">
        <Plus size={16} />Add Line Item
      </button>

      {/* Totals summary */}
      <div className="card p-4 space-y-2.5">
        {[
          { l: 'Subtotal', v: `₹${subtotal.toLocaleString('en-IN')}` },
          { l: 'Discount', v: `-₹${discount.toLocaleString('en-IN')}`, c: 'text-danger' },
          { l: `GST (${gstRate}%)`, v: `₹${gstAmt.toLocaleString('en-IN')}` },
        ].map(r => (
          <div key={r.l} className="flex justify-between text-sm">
            <span className="text-ink-secondary">{r.l}</span>
            <span className={`font-semibold ${(r as any).c || 'text-ink dark:text-slate-200'}`}>{r.v}</span>
          </div>
        ))}
        <div className="flex justify-between pt-3 border-t border-surface-3 dark:border-slate-700">
          <span className="font-bold text-ink dark:text-white">Total</span>
          <motion.span key={total} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-xl font-black text-brand-600">
            ₹{total.toLocaleString('en-IN')}
          </motion.span>
        </div>
      </div>
    </div>
  );

  const MobileStep4 = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-center flex-col gap-4 py-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-lg">
          <Check size={28} className="text-white" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-ink dark:text-white">Quote is ready!</p>
          <p className="text-sm text-ink-tertiary mt-1">QT-2024-001 · ₹{total.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="space-y-3">
        {[
          { icon: Download, label: 'Export as PDF', sub: 'Branded, print-ready',   action: () => {} },
          { icon: Send,     label: 'Send to Client', sub: 'Via email or WhatsApp', action: () => {} },
          { icon: Eye,      label: 'Preview Quote',  sub: 'Full proposal view',    action: () => setMobile(3) },
        ].map(a => (
          <motion.button key={a.label} whileTap={{ scale: 0.97 }} onClick={a.action}
            className="w-full flex items-center gap-4 p-4 card text-left">
            <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center flex-shrink-0">
              <a.icon size={20} className="text-brand-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink dark:text-white">{a.label}</p>
              <p className="text-xs text-ink-tertiary">{a.sub}</p>
            </div>
            <ChevronDown size={16} className="ml-auto text-ink-tertiary rotate-[-90deg]" />
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Back + title row */}
      <div className="flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate('quotes')}
          className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-surface-3 dark:border-slate-800 shadow-sm text-ink-secondary lg:hidden">
          <ArrowLeft size={17} />
        </motion.button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-ink dark:text-white">QT-2024-001</h2>
            <span className="badge-draft text-[10px]">Draft</span>
          </div>
          <p className="text-xs text-ink-tertiary">Saved 2 min ago</p>
        </div>
        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex bg-surface-2 dark:bg-slate-800 rounded-2xl p-1">
            {(['edit','preview'] as const).map(tab => (
              <motion.button key={tab} onClick={() => setDesktop(tab)} whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold capitalize ${desktopTab === tab ? 'text-ink dark:text-white' : 'text-ink-tertiary'}`}>
                {desktopTab === tab && <motion.div layoutId="editorTabDesktop" className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-sm" transition={{ type: 'spring', bounce: 0.2 }} />}
                <span className="relative z-10 flex items-center gap-1.5">{tab === 'preview' && <Eye size={12} />}{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </motion.button>
            ))}
          </div>
          <button className="btn-secondary text-xs h-9 px-4 gap-1.5 min-h-0"><Download size={13} />PDF</button>
          <button className="btn-primary text-xs h-9 px-4 gap-1.5 min-h-0"><Send size={13} />Send</button>
        </div>
      </div>

      {/* ── MOBILE: 4-step wizard ────────────────────── */}
      <div className="lg:hidden">
        {/* Step indicator */}
        <div className="flex gap-1 mb-4">
          {wizardSteps.map(s => (
            <motion.button key={s.id} whileTap={{ scale: 0.95 }} onClick={() => setMobile(s.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-2xl text-[10px] font-bold transition-all ${mobileStep === s.id ? 'bg-brand-600 text-white' : mobileStep > s.id ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-surface-2 dark:bg-slate-800 text-ink-tertiary'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mobileStep === s.id ? 'bg-brand-500' : mobileStep > s.id ? 'bg-emerald-500' : 'bg-surface-3 dark:bg-slate-700'}`}>
                {mobileStep > s.id ? <Check size={10} className="text-white" /> : <span className="text-[9px] font-black text-white">{s.id}</span>}
              </div>
              {s.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mobileStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}>
            {mobileStep === 1 && <MobileStep1 />}
            {mobileStep === 2 && <MobileStep2 />}
            {mobileStep === 3 && (
              <Card className="overflow-hidden">
                <PreviewContent />
              </Card>
            )}
            {mobileStep === 4 && <MobileStep4 />}
          </motion.div>
        </AnimatePresence>

        {/* Sticky bottom nav buttons */}
        <div className="sticky bottom-0 pt-4 pb-1 bg-surface-1 dark:bg-[#080C14] -mx-4 px-4 mt-6">
          <div className="flex gap-3">
            {mobileStep > 1 && (
              <button onClick={() => setMobile(mobileStep - 1)} className="btn-secondary flex-shrink-0 h-12 px-5 min-h-0">
                <ArrowLeft size={16} />
              </button>
            )}
            {mobileStep < 4 ? (
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setMobile(mobileStep + 1)} className="btn-primary flex-1 h-12 gap-2 min-h-0 text-sm">
                {mobileStep === 3 ? 'Finalize Quote' : 'Continue'}
                <ArrowRight size={16} />
              </motion.button>
            ) : (
              <motion.button whileTap={{ scale: 0.97 }} className="btn-primary flex-1 h-12 gap-2 min-h-0 text-sm">
                <Download size={16} />Generate PDF
              </motion.button>
            )}
          </div>
          <div style={{ height: 'env(safe-area-inset-bottom)' }} />
        </div>
      </div>

      {/* ── DESKTOP: Split screen ────────────────────── */}
      <div className="hidden lg:block">
        <AnimatePresence mode="wait">
          {desktopTab === 'edit' ? (
            <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-3 gap-5">
              {/* Left: Form */}
              <div className="col-span-2 space-y-5">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Quote Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Client Name', value: client, setter: setClient },
                      { label: 'Project Name', value: project, setter: setProject },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-xs font-semibold text-ink-secondary block mb-1.5">{f.label}</label>
                        <input value={f.value} onChange={e => f.setter(e.target.value)} className="field-sm" />
                      </div>
                    ))}
                    <div><label className="text-xs font-semibold text-ink-secondary block mb-1.5">Date</label><input type="date" defaultValue="2024-03-01" className="field-sm" /></div>
                    <div><label className="text-xs font-semibold text-ink-secondary block mb-1.5">Valid Until</label><input type="date" defaultValue="2024-03-31" className="field-sm" /></div>
                  </div>
                </Card>
                <Card padding="none">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-ink dark:text-white">Line Items</h3>
                    <button onClick={() => { setAI(true); setTimeout(() => setAI(false), 1600); }} className="flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-700">
                      {aiLoading ? <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <Sparkles size={12} />}
                      AI Improve
                    </button>
                  </div>
                  <table className="w-full">
                    <thead><tr className="border-b border-surface-3/50 dark:border-slate-800">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-ink-tertiary">Description</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-ink-tertiary w-20">Qty</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-ink-tertiary w-24">Unit</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-ink-tertiary w-32">Rate</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-ink-tertiary w-32">Total</th>
                      <th className="px-3 py-3 w-10" />
                    </tr></thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.id} className="group border-b border-surface-3/30 dark:border-slate-800/40 last:border-0 hover:bg-surface-1/50 transition-colors">
                          <td className="px-5 py-3"><input value={item.description} onChange={e => updateItem(item.id,'description',e.target.value)} className="w-full text-sm text-ink dark:text-slate-200 bg-transparent focus:outline-none focus:bg-surface-2 dark:focus:bg-slate-800 rounded-xl px-2 py-1.5 -mx-2 transition-colors" /></td>
                          <td className="px-3 py-3"><input type="number" value={item.quantity} onChange={e => updateItem(item.id,'quantity',parseFloat(e.target.value)||0)} className="w-full text-sm text-right text-ink dark:text-slate-200 bg-transparent focus:outline-none focus:bg-surface-2 dark:focus:bg-slate-800 rounded-xl px-2 py-1.5 transition-colors" /></td>
                          <td className="px-3 py-3"><input value={item.unit} onChange={e => updateItem(item.id,'unit',e.target.value)} className="w-full text-sm text-ink dark:text-slate-200 bg-transparent focus:outline-none focus:bg-surface-2 dark:focus:bg-slate-800 rounded-xl px-2 py-1.5 transition-colors" /></td>
                          <td className="px-3 py-3"><input type="number" value={item.unitPrice} onChange={e => updateItem(item.id,'unitPrice',parseFloat(e.target.value)||0)} className="w-full text-sm text-right text-ink dark:text-slate-200 bg-transparent focus:outline-none focus:bg-surface-2 dark:focus:bg-slate-800 rounded-xl px-2 py-1.5 transition-colors" /></td>
                          <td className="px-3 py-3 text-right"><span className="text-sm font-bold text-ink dark:text-slate-200">₹{(item.quantity*item.unitPrice).toLocaleString('en-IN')}</span></td>
                          <td className="px-3 py-3"><motion.button whileTap={{ scale: 0.9 }} onClick={() => items.length > 1 && setItems(items.filter(i => i.id !== item.id))} className="w-7 h-7 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 hover:bg-danger/10 text-danger/60 hover:text-danger transition-all"><Trash2 size={13} /></motion.button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-4 border-t border-surface-3/50 dark:border-slate-800">
                    <button onClick={() => setItems([...items, {id:Date.now().toString(),description:'',quantity:1,unit:'unit',unitPrice:0}])} className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
                      <div className="w-6 h-6 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center"><Plus size={13} /></div>Add line item
                    </button>
                  </div>
                </Card>
                <Card>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold text-ink-secondary block mb-1.5">Notes</label><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="field-sm resize-none" /></div>
                    <div><label className="text-xs font-semibold text-ink-secondary block mb-1.5">Terms</label><textarea value={terms} onChange={e => setTerms(e.target.value)} rows={3} className="field-sm resize-none" /></div>
                  </div>
                </Card>
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-4">
                <Card className="border-brand-100 dark:border-brand-800/50 bg-gradient-to-b from-brand-50/60 to-white dark:from-brand-900/10 dark:to-slate-900">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md"><Sparkles size={14} className="text-white" /></div>
                    <h3 className="text-sm font-bold text-ink dark:text-white">AI Tools</h3>
                  </div>
                  {[{i:Wand2,l:'Generate Full Quote'},{i:RefreshCw,l:'Rewrite Quote'},{i:Sparkles,l:'Improve Wording'},{i:FileText,l:'Generate Proposal'}].map(t=>(
                    <motion.button key={t.l} whileHover={{ x: 3 }} className="flex items-center gap-2.5 w-full text-sm font-semibold text-brand-700 dark:text-brand-400 py-2.5 px-3 rounded-xl hover:bg-brand-50/80 dark:hover:bg-brand-900/20 transition-colors">
                      <t.i size={14} />{t.l}
                    </motion.button>
                  ))}
                </Card>
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Summary</h3>
                  <div className="space-y-2.5">
                    {[{l:'Subtotal',v:`₹${subtotal.toLocaleString('en-IN')}`},{l:'Discount',v:`-₹${discount.toLocaleString('en-IN')}`,c:'text-danger'},{l:`GST (${gstRate}%)`,v:`₹${gstAmt.toLocaleString('en-IN')}`}].map(r=>(
                      <div key={r.l} className="flex justify-between text-sm"><span className="text-ink-secondary">{r.l}</span><span className={`font-semibold ${(r as any).c||'text-ink dark:text-slate-200'}`}>{r.v}</span></div>
                    ))}
                    <div className="flex justify-between pt-3 border-t border-surface-3 dark:border-slate-800">
                      <span className="font-bold text-ink dark:text-white">Total</span>
                      <motion.span key={total} initial={{ scale: 1.12 }} animate={{ scale: 1 }} className="text-xl font-black text-brand-600">₹{total.toLocaleString('en-IN')}</motion.span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <label className="section-label block mb-2.5">Status</label>
                  <div className="relative">
                    <select className="field-sm appearance-none w-full">{['Draft','Sent','Accepted','Rejected','Expired'].map(s=><option key={s}>{s}</option>)}</select>
                    <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
                  </div>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="max-w-2xl mx-auto">
                <Card className="shadow-xl"><PreviewContent /></Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
