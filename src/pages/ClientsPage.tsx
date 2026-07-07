import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Users, Mail, Phone, Building2, X,
  TrendingUp, Star, MoreHorizontal, FileText, ChevronRight,
} from 'lucide-react';
import { clients as initialClients } from '../data/mockData';
import type { Page } from '../App';

interface ClientsPageProps { onNavigate: (page: Page) => void; }

const avatarColors = [
  'from-brand-400 to-brand-700',
  'from-teal-400 to-teal-700',
  'from-accent-400 to-accent-700',
  'from-[#8B5CF6] to-[#6D28D9]',
  'from-[#EC4899] to-[#BE185D]',
];

function AddClientModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
        className="relative w-full sm:max-w-md card rounded-b-none sm:rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-surface-3 dark:bg-[#1A2B42]" />
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3 dark:border-[#1A2B42]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md">
              <Users size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink dark:text-white">Add New Client</h2>
              <p className="text-xs text-ink-tertiary">Fill in the details below</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Full Name',    key: 'name',    placeholder: 'e.g. Priya Sharma',        icon: <Users size={15} /> },
            { label: 'Email',        key: 'email',   placeholder: 'priya@example.com',         icon: <Mail size={15} /> },
            { label: 'Phone',        key: 'phone',   placeholder: '+91 98765 43210',           icon: <Phone size={15} /> },
            { label: 'Company',      key: 'company', placeholder: 'Company name (optional)',   icon: <Building2 size={15} /> },
          ].map(f => (
            <div key={f.key}>
              <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary">{f.icon}</div>
                <input value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder} className="field pl-10" />
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button onClick={onClose} className="btn-primary flex-1">Add Client</button>
          </div>
          <div style={{ height: 'env(safe-area-inset-bottom)' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ClientsPage({ onNavigate }: ClientsPageProps) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = initialClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = initialClients.reduce((s, c) => s + c.totalValue, 0);

  return (
    <div className="space-y-5">
      <AnimatePresence>{showAdd && <AddClientModal onClose={() => setShowAdd(false)} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-ink dark:text-white">Clients</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">{initialClients.length} clients · ₹{(totalValue/100000).toFixed(1)}L total value</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowAdd(true)} className="btn-primary h-10 px-4 text-xs min-h-0 gap-1.5">
          <Plus size={14} />Add Client
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Clients', value: initialClients.length, color: 'text-brand-600 dark:text-brand-400' },
          { label: 'Total Value',   value: `₹${(totalValue/100000).toFixed(1)}L`, color: 'text-teal-600 dark:text-teal-400' },
          { label: 'Avg Projects',  value: (initialClients.reduce((s, c) => s + c.projects, 0) / initialClients.length).toFixed(1), color: 'text-accent-600 dark:text-accent-400' },
        ].map(s => (
          <div key={s.label} className="card text-center !p-4">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-ink-tertiary mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        <input type="text" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} className="field pl-11" />
      </div>

      {/* Client Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-16 h-16 rounded-3xl bg-surface-2 dark:bg-[#111B2E] flex items-center justify-center">
            <Users size={28} className="text-ink-tertiary" />
          </div>
          <p className="text-sm font-semibold text-ink-secondary">No clients found</p>
          <button onClick={() => setShowAdd(true)} className="btn-primary h-10 px-5 text-sm min-h-0">Add your first client</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client, i) => {
            const grad = avatarColors[i % avatarColors.length];
            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="card group cursor-pointer transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-dark-hover !p-0 overflow-hidden"
              >
                {/* Top accent strip */}
                <div className={`h-1.5 bg-gradient-to-r ${grad}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-black text-base shadow-md`}>
                        {client.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink dark:text-white">{client.name}</p>
                        {client.company && <p className="text-xs text-ink-tertiary">{client.company}</p>}
                      </div>
                    </div>
                    <button className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-ink-secondary">
                      <Mail size={12} className="text-ink-tertiary flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink-secondary">
                      <Phone size={12} className="text-ink-tertiary flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-surface-3 dark:border-[#1A2B42]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <FileText size={12} className="text-brand-500" />
                        <span className="text-xs font-bold text-ink dark:text-slate-200">{client.projects}</span>
                        <span className="text-xs text-ink-tertiary">projects</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-teal-500" />
                      <span className="text-sm font-black text-ink dark:text-white">₹{(client.totalValue/1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
