import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Phone, Mail, Building2, FileText, X,
  ChevronRight, Edit, TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { clients, quotes } from '../data/mockData';
import type { Client } from '../types';
import type { Page } from '../App';

interface ClientsPageProps { onNavigate: (page: Page) => void; }

function AddClientModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', address: '' });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0.08, duration: 0.42 }}
        className="relative w-full sm:max-w-md card rounded-b-none sm:rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden"><div className="w-10 h-1 rounded-full bg-surface-3 dark:bg-slate-700" /></div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-slate-800">
          <h2 className="text-base font-bold text-ink dark:text-white">Add New Client</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-2 dark:hover:bg-slate-800 text-ink-tertiary"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Full Name *', key: 'name', placeholder: 'Priya Sharma', col: 'full' },
            { label: 'Email *', key: 'email', placeholder: 'priya@email.com', col: 'full' },
            { label: 'Phone', key: 'phone', placeholder: '+91 98765 43210', col: 'half' },
            { label: 'Studio / Company', key: 'company', placeholder: 'Studio name', col: 'half' },
            { label: 'City', key: 'address', placeholder: 'Mumbai', col: 'full' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
              <input value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="field" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button onClick={onClose} className="btn-primary flex-1">Add Client</button>
          </div>
          <div style={{ height: 'env(safe-area-inset-bottom)' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ClientPanel({ client, onClose, onNavigate }: { client: Client; onClose: () => void; onNavigate: (page: Page) => void }) {
  const clientQuotes = quotes.filter(q => q.clientId === client.id);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.38 }}
        className="relative bg-white dark:bg-slate-900 w-full sm:max-w-md h-full overflow-y-auto border-l border-surface-3 dark:border-slate-800 shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-surface-3 dark:border-slate-800">
          <p className="text-sm font-bold text-ink dark:text-white">Client Profile</p>
          <div className="flex gap-2">
            <button className="btn-ghost h-8 w-8 p-0 rounded-xl min-h-0"><Edit size={14} /></button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-2 dark:hover:bg-slate-800 text-ink-secondary min-h-0"><X size={16} /></button>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-2xl font-black shadow-lg flex-shrink-0">{client.name[0]}</div>
            <div>
              <h3 className="text-xl font-bold text-ink dark:text-white">{client.name}</h3>
              {client.company && <p className="text-sm text-ink-secondary">{client.company}</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[{l:'Projects',v:client.projects},{l:'Revenue',v:`₹${(client.totalValue/1000).toFixed(0)}K`},{l:'Since',v:client.createdAt.substring(0,7)}].map(s=>(
              <div key={s.l} className="bg-surface-1 dark:bg-slate-800 rounded-2xl p-3 text-center">
                <p className="text-base font-bold text-ink dark:text-white">{s.v}</p>
                <p className="text-xs text-ink-tertiary mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
          <Card>
            <p className="section-label mb-3">Contact Info</p>
            {[{icon:Mail,l:'Email',v:client.email},{icon:Phone,l:'Phone',v:client.phone},...(client.address?[{icon:Building2,l:'Location',v:client.address}]:[])].map(f=>(
              <div key={f.l} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 rounded-xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center flex-shrink-0"><f.icon size={14} className="text-ink-secondary" /></div>
                <div className="min-w-0"><p className="text-2xs text-ink-tertiary">{f.l}</p><p className="text-sm text-ink dark:text-slate-200 truncate">{f.v}</p></div>
              </div>
            ))}
          </Card>
          {clientQuotes.length > 0 && (
            <div>
              <p className="section-label mb-3">Quote History</p>
              <div className="space-y-2.5">
                {clientQuotes.map(q => (
                  <div key={q.id} className="flex items-center justify-between p-3.5 bg-surface-1 dark:bg-slate-800 rounded-2xl">
                    <div><p className="text-sm font-semibold text-ink dark:text-slate-200 truncate max-w-[160px]">{q.projectName}</p><p className="text-xs text-ink-tertiary">{q.createdAt}</p></div>
                    <div className="flex items-center gap-2"><span className="text-sm font-bold text-ink dark:text-slate-200">₹{(q.total/1000).toFixed(0)}K</span><Badge variant={q.status} dot>{q.status.charAt(0).toUpperCase()+q.status.slice(1)}</Badge></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button onClick={() => { onNavigate('quote-editor'); onClose(); }} className="btn-primary flex-1 gap-2"><Plus size={15} />New Quote</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const cardItem  = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };

export function ClientsPage({ onNavigate }: ClientsPageProps) {
  const [search, setSearch]   = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <AnimatePresence>{showAdd && <AddClientModal onClose={() => setShowAdd(false)} />}</AnimatePresence>
      <AnimatePresence>{selected && <ClientPanel client={selected} onClose={() => setSelected(null)} onNavigate={onNavigate} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">Clients</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">{clients.length} clients · ₹{(clients.reduce((s,c)=>s+c.totalValue,0)/100000).toFixed(1)}L total</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowAdd(true)} className="btn-primary h-10 px-4 text-sm gap-1.5 min-h-0">
          <Plus size={15} />Add
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        <input type="text" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} className="field pl-11" />
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: 'Clients',  v: clients.length,                                               icon: Building2, c: 'text-brand-600',   b: 'bg-brand-50 dark:bg-brand-900/20' },
          { l: 'Projects', v: clients.reduce((s,c)=>s+c.projects,0),                        icon: FileText,  c: 'text-violet-600',  b: 'bg-violet-50 dark:bg-violet-900/20' },
          { l: 'Revenue',  v: `₹${(clients.reduce((s,c)=>s+c.totalValue,0)/100000).toFixed(1)}L`, icon: TrendingUp, c: 'text-emerald-600', b: 'bg-emerald-50 dark:bg-emerald-900/20' },
        ].map((s, i) => (
          <motion.div key={s.l} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.06 }}>
            <Card className="p-3.5">
              <div className={`w-8 h-8 rounded-xl ${s.b} flex items-center justify-center mb-2`}><s.icon size={15} className={s.c} /></div>
              <p className="text-lg font-bold text-ink dark:text-white">{s.v}</p>
              <p className="text-xs text-ink-tertiary">{s.l}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Client grid: 1-col mobile → 2-col sm → 3-col lg */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map(client => (
          <motion.div key={client.id} variants={cardItem}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(client)}
            className="card p-4 sm:p-5 cursor-pointer active:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-base font-bold shadow-md flex-shrink-0">{client.name[0]}</div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white">{client.name}</p>
                  {client.company && <p className="text-xs text-ink-tertiary">{client.company}</p>}
                </div>
              </div>
              <ChevronRight size={16} className="text-ink-tertiary mt-1 flex-shrink-0" />
            </div>
            <div className="space-y-1.5 mb-3.5">
              {[{icon:Mail,v:client.email},{icon:Phone,v:client.phone}].map(f=>(
                <div key={f.v} className="flex items-center gap-2 text-xs text-ink-secondary">
                  <f.icon size={11} className="text-ink-tertiary flex-shrink-0" />
                  <span className="truncate">{f.v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-surface-3 dark:border-slate-800">
              <span className="text-xs text-ink-tertiary flex items-center gap-1"><FileText size={11}/>{client.projects} project{client.projects!==1?'s':''}</span>
              <span className="text-sm font-bold text-ink dark:text-white">₹{(client.totalValue/1000).toFixed(0)}K</span>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 flex flex-col items-center py-16 gap-3">
            <div className="w-14 h-14 rounded-3xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center"><Building2 size={26} className="text-ink-tertiary" /></div>
            <p className="text-sm font-semibold text-ink-secondary">No clients found</p>
            <button onClick={() => setShowAdd(true)} className="text-sm text-brand-600 font-semibold">Add your first client →</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
