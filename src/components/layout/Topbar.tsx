import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Command, Plus } from 'lucide-react';
import type { Page } from '../../App';

interface TopbarProps {
  currentPage: Page;
  onNavigate?: (page: Page) => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard:          { title: 'Dashboard',        subtitle: 'Good morning, Riya ✦' },
  quotes:             { title: 'Quotes',            subtitle: 'Manage all quotations' },
  clients:            { title: 'Clients',           subtitle: 'Your client directory' },
  'proposal-builder': { title: 'Proposal Builder', subtitle: 'AI-powered proposals' },
  templates:          { title: 'Templates',         subtitle: 'Reusable quote templates' },
  analytics:          { title: 'Analytics',         subtitle: 'Performance overview' },
  settings:           { title: 'Settings',          subtitle: 'Workspace preferences' },
  'quote-editor':     { title: 'Quote Editor',      subtitle: 'QT-2024-001' },
};

export function Topbar({ currentPage, onNavigate }: TopbarProps) {
  const [focused, setFocused] = useState(false);
  const info = pageTitles[currentPage] || { title: 'Quotera AI', subtitle: '' };

  return (
    <header className="h-16 flex items-center justify-between px-6 gap-4
      bg-white/80 dark:bg-[#070B14]/80
      backdrop-blur-2xl
      border-b border-surface-3/70 dark:border-[#0F1A2E]
      sticky top-0 z-20
      shadow-[0_1px_0_rgba(12,17,29,0.04)]">

      <div className="min-w-0">
        <h1 className="text-[15px] font-bold text-ink dark:text-white leading-tight">
          {info.title}
        </h1>
        <p className="text-[11px] text-ink-tertiary leading-none mt-0.5">{info.subtitle}</p>
      </div>

      <motion.div animate={{ width: focused ? 300 : 210 }} transition={{ duration: 0.22 }} className="hidden sm:flex relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        <input
          type="text"
          placeholder="Search anything..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-9 pr-10 py-2.5 text-sm
            bg-surface-1 dark:bg-[#0F1724]
            border border-surface-3 dark:border-[#1C2B45]
            rounded-2xl placeholder-ink-tertiary text-ink dark:text-slate-100
            focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400
            transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-35 pointer-events-none">
          <Command size={10} /><span className="text-[10px] font-medium">K</span>
        </div>
      </motion.div>

      <div className="flex items-center gap-2">
        {onNavigate && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('quote-editor')}
            className="hidden md:flex btn-primary text-xs h-9 px-4 gap-1.5 min-h-0"
          >
            <Plus size={13} />New Quote
          </motion.button>
        )}
        <motion.button whileTap={{ scale: 0.88 }}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl
            hover:bg-surface-2 dark:hover:bg-[#0F1724]
            text-ink-secondary transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full
            ring-2 ring-white dark:ring-[#070B14]
            shadow-[0_0_4px_rgba(26,123,255,0.7)]" />
        </motion.button>
        <div className="w-9 h-9 rounded-xl
          bg-gradient-to-br from-brand-400 to-brand-700
          flex items-center justify-center text-white text-sm font-bold
          cursor-pointer
          shadow-[0_2px_8px_rgba(26,123,255,0.35)]">R</div>
      </div>
    </header>
  );
}
