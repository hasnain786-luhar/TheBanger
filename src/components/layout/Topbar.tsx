import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Plus, Command } from 'lucide-react';
import type { Page } from '../../App';

interface TopbarProps {
  currentPage: Page;
  onNavigate?: (page: Page) => void;
  onOpenCmd: () => void;
}

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  dashboard:          { title: 'Dashboard',        subtitle: 'Monday, July 7, 2025' },
  quotes:             { title: 'Quotations',        subtitle: 'Manage all your quotes' },
  clients:            { title: 'Clients',           subtitle: 'Your client directory' },
  'proposal-builder': { title: 'Proposal Builder', subtitle: 'AI-powered proposals' },
  templates:          { title: 'Templates',         subtitle: 'Reusable quote templates' },
  analytics:          { title: 'Analytics',         subtitle: 'Business performance' },
  settings:           { title: 'Settings',          subtitle: 'Workspace preferences' },
  'quote-editor':     { title: 'Quote Editor',      subtitle: 'QT-2024-007' },
};

export function Topbar({ currentPage, onNavigate, onOpenCmd }: TopbarProps) {
  const meta = pageMeta[currentPage] || { title: 'Quotera AI', subtitle: '' };

  return (
    <header className="h-[60px] flex items-center justify-between gap-4 px-6
      bg-white/80 dark:bg-[#060B14]/80
      backdrop-blur-2xl
      border-b border-surface-3/60 dark:border-[#0F1D30]
      sticky top-0 z-20">

      <div className="min-w-0">
        <h1 className="text-[15px] font-bold text-ink dark:text-white leading-tight">{meta.title}</h1>
        <p className="text-[11px] text-ink-tertiary">{meta.subtitle}</p>
      </div>

      <button
        onClick={onOpenCmd}
        className="hidden sm:flex items-center gap-2.5 px-3 py-2
          bg-surface-1 dark:bg-[#0D1828]
          border border-surface-3 dark:border-[#1A2B42]
          rounded-2xl text-ink-tertiary text-sm
          hover:bg-surface-2 dark:hover:bg-[#111B2E]
          transition-colors w-[200px]"
      >
        <Search size={14} />
        <span className="flex-1 text-left text-xs text-ink-tertiary">Search...</span>
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-surface-2 dark:bg-[#1A2B42] flex items-center gap-0.5">
          <Command size={9} />K
        </kbd>
      </button>

      <div className="flex items-center gap-2">
        {onNavigate && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('quote-editor')}
            className="hidden md:flex btn-primary text-xs h-9 px-4 min-h-0 gap-1.5"
          >
            <Plus size={13} />New Quote
          </motion.button>
        )}

        <motion.button whileTap={{ scale: 0.88 }}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl
            hover:bg-surface-2 dark:hover:bg-[#111B2E]
            text-ink-secondary transition-colors">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-500 rounded-full
            shadow-[0_0_0_2px_white] dark:shadow-[0_0_0_2px_#060B14]" />
        </motion.button>

        <div className="w-8 h-8 rounded-xl
          bg-gradient-to-br from-brand-400 to-brand-700
          flex items-center justify-center text-white text-sm font-bold
          cursor-pointer shadow-[0_2px_8px_rgba(26,123,255,0.4)]">R</div>
      </div>
    </header>
  );
}
