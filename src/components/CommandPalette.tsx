import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, FileText, Users, BarChart3, Settings, Wand2, LayoutTemplate,
  LayoutDashboard, ArrowRight, Hash, Sparkles, Plus, Command,
} from 'lucide-react';
import type { Page } from '../../App';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

const navActions = [
  { icon: LayoutDashboard, label: 'Go to Dashboard',        page: 'dashboard'        as Page, group: 'Navigate' },
  { icon: FileText,        label: 'Go to Quotes',            page: 'quotes'           as Page, group: 'Navigate' },
  { icon: Users,           label: 'Go to Clients',           page: 'clients'          as Page, group: 'Navigate' },
  { icon: Wand2,           label: 'Go to Proposal Builder',  page: 'proposal-builder' as Page, group: 'Navigate' },
  { icon: LayoutTemplate,  label: 'Go to Templates',         page: 'templates'        as Page, group: 'Navigate' },
  { icon: BarChart3,       label: 'Go to Analytics',         page: 'analytics'        as Page, group: 'Navigate' },
  { icon: Settings,        label: 'Go to Settings',          page: 'settings'         as Page, group: 'Navigate' },
];

const quickActions = [
  { icon: Plus,      label: 'Create New Quote',     page: 'quote-editor'     as Page, group: 'Actions' },
  { icon: Sparkles,  label: 'AI Generate Quote',    page: 'quotes'           as Page, group: 'Actions' },
  { icon: Wand2,     label: 'Generate Proposal',    page: 'proposal-builder' as Page, group: 'Actions' },
  { icon: Users,     label: 'Add New Client',       page: 'clients'          as Page, group: 'Actions' },
];

type CmdItem = typeof navActions[0];

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = [...quickActions, ...navActions];
  const filtered = query
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  useEffect(() => {
    if (open) { setQuery(''); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const select = (item: CmdItem) => { onNavigate(item.page); onClose(); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[activeIdx]) { select(filtered[activeIdx]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, activeIdx, filtered]);

  const groups = filtered.reduce<Record<string, CmdItem[]>>((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="cmd-overlay"
          onClick={onClose}
        >
          <motion.div
            key="cmd-box"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="cmd-box"
            onClick={e => e.stopPropagation()}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-3 dark:border-[#1A2B42]">
              <Search size={16} className="text-ink-tertiary flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages, actions..."
                className="flex-1 text-[15px] bg-transparent outline-none text-ink dark:text-slate-100 placeholder-ink-tertiary"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-2 dark:bg-[#111B2E] text-ink-tertiary text-[11px] font-mono">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3 text-ink-tertiary">
                  <Hash size={24} />
                  <p className="text-sm">No results for "{query}"</p>
                </div>
              ) : (
                Object.entries(groups).map(([group, items]) => {
                  let globalIdx = filtered.indexOf(items[0]);
                  return (
                    <div key={group}>
                      <p className="section-label px-4 pt-3 pb-1.5">{group}</p>
                      {items.map((item, i) => {
                        const idx = globalIdx + i;
                        const isActive = activeIdx === idx;
                        return (
                          <motion.button
                            key={item.label}
                            onClick={() => select(item)}
                            onMouseEnter={() => setActiveIdx(idx)}
                            whileTap={{ scale: 0.98 }}
                            className={`cmd-item w-full ${isActive ? 'cmd-item-active' : 'cmd-item-idle'}`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                              ${isActive
                                ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400'
                                : 'bg-surface-2 dark:bg-[#111B2E] text-ink-secondary'}`}>
                              <item.icon size={15} />
                            </div>
                            <span className="flex-1 text-left font-medium">{item.label}</span>
                            {isActive && (
                              <ArrowRight size={13} className="text-brand-500 dark:text-brand-400 flex-shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5
              border-t border-surface-3 dark:border-[#1A2B42]">
              <div className="flex items-center gap-3 text-[11px] text-ink-tertiary">
                <span className="flex items-center gap-1"><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="font-mono">↵</kbd> open</span>
                <span className="flex items-center gap-1"><kbd className="font-mono">esc</kbd> close</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-ink-tertiary">
                <Command size={11} />
                <span>K</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
