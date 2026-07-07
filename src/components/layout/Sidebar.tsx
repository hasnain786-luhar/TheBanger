import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, Users, Wand2, BarChart3,
  Settings, Zap, LayoutTemplate, LogOut, Sun, Moon, Sparkles,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { Page } from '../../App';

interface SidebarProps {
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
];

export function Sidebar({ currentPage, onNavigate, darkMode, onToggleDark }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 252 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-full z-30 flex flex-col overflow-hidden
        bg-white dark:bg-[#070B14]
        border-r border-surface-3 dark:border-[#0F1A2E]"
    >
      {/* Logo */}
      <div className={`h-16 flex items-center border-b border-surface-3 dark:border-[#0F1A2E] flex-shrink-0 ${collapsed ? 'justify-center' : 'px-5 gap-3'}`}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('dashboard')}
          className="w-8 h-8 rounded-xl flex-shrink-0 cursor-pointer relative overflow-hidden
            bg-gradient-to-br from-brand-500 to-brand-700
            shadow-[0_2px_8px_rgba(26,123,255,0.45)]
            flex items-center justify-center"
        >
          <Zap size={15} className="text-white relative z-10" fill="white" />
        </motion.div>
        {!collapsed && (
          <div className="min-w-0">
            <span className="text-[15px] font-black text-ink dark:text-white tracking-tight whitespace-nowrap">
              Quotera
            </span>
            <span className="text-[15px] font-black tracking-tight whitespace-nowrap text-gradient-brand"> AI</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {!collapsed && (
          <p className="section-label px-3 pb-2.5 pt-0.5">Navigation</p>
        )}
        {navItems.map((item) => {
          const active = currentPage === item.page;
          return (
            <motion.button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              whileTap={{ scale: 0.97 }}
              title={collapsed ? item.label : undefined}
              className={`nav-item w-full relative ${collapsed ? 'justify-center px-2' : ''} ${active ? 'nav-item-active' : 'nav-item-idle'}`}
            >
              {active && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute inset-0 rounded-xl
                    bg-gradient-to-r from-brand-50 to-brand-50/60
                    dark:from-brand-950/80 dark:to-brand-950/40
                    border border-brand-100 dark:border-brand-900/60"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                />
              )}
              <div className={`relative z-10 flex-shrink-0 transition-colors ${active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-tertiary'}`}>
                <item.icon size={17} />
              </div>
              {!collapsed && (
                <span className={`relative z-10 truncate text-sm ${active ? 'font-semibold text-brand-700 dark:text-brand-300' : 'font-medium'}`}>
                  {item.label}
                </span>
              )}
              {active && !collapsed && (
                <div className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
              )}
            </motion.button>
          );
        })}

        {/* AI Banner */}
        {!collapsed && (
          <div className="mt-4 mx-1 rounded-2xl overflow-hidden relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001A52] to-[#003A96] dark:from-[#001A52] dark:to-[#0D2665]" />
            {/* Mesh glow */}
            <div className="absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(59,146,255,0.4) 0%, transparent 70%)' }} />
            <div className="relative z-10 p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={12} className="text-accent-300" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">AI Ready</span>
              </div>
              <p className="text-[11px] text-blue-200/70 leading-relaxed mb-3">
                Generate a winning quote in 30 seconds.
              </p>
              <button
                onClick={() => onNavigate('quotes')}
                className="w-full text-[11px] font-bold text-white
                  bg-gradient-to-r from-brand-500/70 to-brand-600/70
                  border border-brand-400/30 rounded-xl py-2
                  hover:from-brand-500 hover:to-brand-600
                  transition-all duration-200 backdrop-blur-sm"
              >
                Create Quote →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-surface-3 dark:border-[#0F1A2E] space-y-0.5 flex-shrink-0">
        {[{ label: 'Settings', icon: Settings, page: 'settings' as Page }].map((item) => {
          const active = currentPage === item.page;
          return (
            <motion.button key={item.page} onClick={() => onNavigate(item.page)} whileTap={{ scale: 0.97 }}
              className={`nav-item w-full relative ${collapsed ? 'justify-center px-2' : ''} ${active ? 'nav-item-active' : 'nav-item-idle'}`}>
              <item.icon size={17} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </motion.button>
          );
        })}
        <motion.button whileTap={{ scale: 0.97 }} onClick={onToggleDark}
          className={`nav-item w-full nav-item-idle ${collapsed ? 'justify-center px-2' : ''}`}>
          {darkMode
            ? <Sun size={17} className="text-accent-500" />
            : <Moon size={17} />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate('login')}
          className={`nav-item w-full text-ink-secondary hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/10 dark:hover:text-danger-400 ${collapsed ? 'justify-center px-2' : ''}`}>
          <LogOut size={17} />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </motion.button>

        {/* User chip */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-2xl bg-surface-1 dark:bg-[#0F1724] border border-surface-3 dark:border-[#1C2B45]">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm">R</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink dark:text-white truncate">Riya Desai</p>
              <p className="text-2xs text-ink-tertiary">Pro Plan</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-success-500 flex-shrink-0" />
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[72px] w-7 h-7
          bg-white dark:bg-[#0F1724]
          border border-surface-3 dark:border-[#1C2B45]
          rounded-full flex items-center justify-center shadow-md
          text-ink-secondary hover:text-brand-600 hover:border-brand-300
          transition-colors z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </motion.button>
    </motion.aside>
  );
}
