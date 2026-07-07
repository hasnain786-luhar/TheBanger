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

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard:          { title: 'Dashboard',        subtitle: 'Good morning, Riya ✦' },
  quotes:             { title: 'Quotes',            subtitle: 'Manage quotations' },
  clients:            { title: 'Clients',           subtitle: 'Your directory' },
  'proposal-builder': { title: 'Proposal Builder', subtitle: 'AI-powered' },
  templates:          { title: 'Templates',         subtitle: 'Ready-to-use' },
  analytics:          { title: 'Analytics',         subtitle: 'Performance' },
  settings:           { title: 'Settings',          subtitle: 'Preferences' },
  'quote-editor':     { title: 'Quote Editor',      subtitle: 'QT-2024-001' },
};

export function TopAppBar({ currentPage, onMenuOpen, onNavigate, showBack, actions }: TopAppBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const info = pageTitles[currentPage] || { title: 'Quotera AI' };

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 px-4
        bg-white/85 dark:bg-[#070B14]/90
        backdrop-blur-2xl
        border-b border-surface-3/60 dark:border-[#0F1A2E]
        shadow-[0_1px_0_rgba(12,17,29,0.04)]"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(3.5rem + env(safe-area-inset-top))',
      }}
    >
      {showBack ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('quotes')}
          className="w-9 h-9 flex items-center justify-center rounded-xl -ml-1
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#0F1724]
            hover:text-ink transition-colors flex-shrink-0"
        >
          <ArrowLeft size={19} />
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl -ml-1
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#0F1724]
            transition-colors flex-shrink-0"
        >
          <Menu size={19} />
        </motion.button>
      )}

      {searchOpen ? (
        <motion.input
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={{ opacity: 1, scaleX: 1 }}
          autoFocus
          type="text"
          placeholder="Search..."
          onBlur={() => setSearchOpen(false)}
          className="flex-1 px-3.5 py-2 text-sm
            bg-surface-2 dark:bg-[#0F1724]
            border border-surface-3 dark:border-[#1C2B45]
            rounded-2xl outline-none
            text-ink dark:text-slate-100
            placeholder-ink-tertiary
            focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400"
        />
      ) : (
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold text-ink dark:text-white leading-tight truncate">
            {info.title}
          </h1>
          {info.subtitle && (
            <p className="text-[11px] text-ink-tertiary leading-none">{info.subtitle}</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-1 flex-shrink-0">
        {actions}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setSearchOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#0F1724]
            transition-colors"
        >
          <Search size={17} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl
            text-ink-secondary hover:bg-surface-2 dark:hover:bg-[#0F1724]
            transition-colors"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2
            bg-brand-500 rounded-full
            ring-2 ring-white dark:ring-[#070B14]
            shadow-[0_0_4px_rgba(26,123,255,0.7)]" />
        </motion.button>
      </div>
    </header>
  );
}
