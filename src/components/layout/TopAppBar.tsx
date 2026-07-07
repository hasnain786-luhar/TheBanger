import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Menu, ArrowLeft } from 'lucide-react';
import type { Page } from '../../App';

interface TopAppBarProps {
  currentPage: Page;
  onMenuOpen: () => void;
  onNavigate: (page: Page) => void;
  showBack?: boolean;
  actions?: React.ReactNode;
}

const pageMeta: Record<string, { title: string; subtitle?: string }> = {
  dashboard:          { title: 'Dashboard',        subtitle: 'Good morning, Riya ✦' },
  quotes:             { title: 'Quotations' },
  clients:            { title: 'Clients' },
  'proposal-builder': { title: 'Proposal Builder' },
  templates:          { title: 'Templates' },
  analytics:          { title: 'Analytics' },
  settings:           { title: 'Settings' },
  'quote-editor':     { title: 'Quote Editor',     subtitle: 'QT-2024-007' },
};

export function TopAppBar({ currentPage, onMenuOpen, onNavigate, showBack, actions }: TopAppBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const meta = pageMeta[currentPage] || { title: 'Quotera AI' };

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 px-4
        bg-white/90 dark:bg-[#060B14]/90
        backdrop-blur-2xl
        border-b border-surface-3/60 dark:border-[#0F1D30]"
      style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(3.5rem + env(safe-area-inset-top))' }}
    >
      {showBack ? (
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => onNavigate('quotes')}
          className="w-9 h-9 flex items-center justify-center rounded-xl -ml-1
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#111B2E] transition-colors flex-shrink-0">
          <ArrowLeft size={19} />
        </motion.button>
      ) : (
        <motion.button whileTap={{ scale: 0.88 }} onClick={onMenuOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl -ml-1
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#111B2E] transition-colors flex-shrink-0">
          <Menu size={19} />
        </motion.button>
      )}

      {searchOpen ? (
        <motion.input
          initial={{ opacity: 0, scaleX: 0.9 }} animate={{ opacity: 1, scaleX: 1 }}
          autoFocus type="text" placeholder="Search..."
          onBlur={() => setSearchOpen(false)}
          className="flex-1 px-3.5 py-2 text-sm rounded-2xl
            bg-surface-2 dark:bg-[#0D1828] border border-surface-3 dark:border-[#1A2B42]
            outline-none text-ink dark:text-slate-100 placeholder-ink-tertiary
            focus:ring-2 focus:ring-brand-500/20"
        />
      ) : (
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold text-ink dark:text-white leading-tight truncate">{meta.title}</h1>
          {meta.subtitle && <p className="text-[11px] text-ink-tertiary leading-none">{meta.subtitle}</p>}
        </div>
      )}

      <div className="flex items-center gap-1 flex-shrink-0">
        {actions}
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => setSearchOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-ink-secondary
            hover:bg-surface-2 dark:hover:bg-[#111B2E] transition-colors">
          <Search size={17} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.88 }}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#111B2E] transition-colors">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-500 rounded-full
            shadow-[0_0_0_2px_white] dark:shadow-[0_0_0_2px_#060B14]" />
        </motion.button>
      </div>
    </header>
  );
}
