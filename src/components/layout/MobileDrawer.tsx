import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Users, Wand2, BarChart3,
  Settings, Zap, LayoutTemplate, LogOut, Sun, Moon,
  X, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../../App';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, page: 'dashboard'        as Page },
  { label: 'Quotes',           icon: FileText,         page: 'quotes'           as Page },
  { label: 'Clients',          icon: Users,            page: 'clients'          as Page },
  { label: 'Proposal Builder', icon: Wand2,            page: 'proposal-builder' as Page },
  { label: 'Templates',        icon: LayoutTemplate,   page: 'templates'        as Page },
  { label: 'Analytics',        icon: BarChart3,        page: 'analytics'        as Page },
  { label: 'Settings',         icon: Settings,         page: 'settings'         as Page },
];

export function MobileDrawer({ open, onClose, currentPage, onNavigate, darkMode, onToggleDark }: MobileDrawerProps) {
  const navigate = (page: Page) => { onNavigate(page); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-[#0C111D]/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.38 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] flex flex-col
              bg-white dark:bg-[#070B14]
              border-r border-surface-3 dark:border-[#0F1A2E]
              shadow-2xl"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16
              border-b border-surface-3 dark:border-[#0F1A2E]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl
                  bg-gradient-to-br from-brand-500 to-brand-700
                  flex items-center justify-center
                  shadow-[0_2px_8px_rgba(26,123,255,0.45)]">
                  <Zap size={15} className="text-white" fill="white" />
                </div>
                <div>
                  <span className="text-[15px] font-black text-ink dark:text-white">Quotera</span>
                  <span className="text-[15px] font-black text-gradient-brand"> AI</span>
                </div>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl
                  hover:bg-surface-2 dark:hover:bg-[#0F1724]
                  text-ink-secondary transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* User card */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center gap-3 p-3
                bg-gradient-to-r from-surface-1 to-surface-2/50
                dark:from-[#0F1724] dark:to-[#0F1724]
                rounded-2xl border border-surface-3 dark:border-[#1C2B45]">
                <div className="w-10 h-10 rounded-2xl
                  bg-gradient-to-br from-brand-400 to-brand-700
                  flex items-center justify-center text-white font-bold text-sm
                  shadow-[0_2px_8px_rgba(26,123,255,0.35)]">R</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink dark:text-white truncate">Riya Desai</p>
                  <p className="text-xs text-ink-tertiary">Pro Plan</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full
                  bg-success-50 dark:bg-[#022C22]">
                  <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-success-700 dark:text-[#6CE9A6]">Active</span>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-hide">
              <p className="section-label px-3 pb-2.5 pt-1">Menu</p>
              {navItems.map((item) => {
                const active = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    whileTap={{ scale: 0.97 }}
                    className={`nav-item w-full ${active ? 'nav-item-active' : 'nav-item-idle'}`}
                  >
                    {active && (
                      <motion.div layoutId="drawerActive"
                        className="absolute inset-0 rounded-xl
                          bg-gradient-to-r from-brand-50 to-brand-50/50
                          dark:from-brand-950/80 dark:to-brand-950/30
                          border border-brand-100 dark:border-brand-900/50"
                        transition={{ type: 'spring', bounce: 0.15 }}
                      />
                    )}
                    <div className={`relative z-10 flex-shrink-0 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-tertiary'}`}>
                      <item.icon size={18} />
                    </div>
                    <span className={`relative z-10 flex-1 text-left text-sm ${active ? 'font-semibold text-brand-700 dark:text-brand-300' : 'font-medium'}`}>
                      {item.label}
                    </span>
                    {active && (
                      <div className="relative z-10 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <ChevronRight size={13} className="text-brand-400" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 pb-3 space-y-1 border-t border-surface-3 dark:border-[#0F1A2E] pt-3"
              style={{ paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom))` }}>
              <motion.button whileTap={{ scale: 0.97 }} onClick={onToggleDark}
                className="nav-item w-full nav-item-idle">
                {darkMode
                  ? <Sun size={18} className="text-accent-500" />
                  : <Moon size={18} />}
                <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('login')}
                className="nav-item w-full text-ink-secondary hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/10">
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
