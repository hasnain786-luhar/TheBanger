import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, Users, Wand2, BarChart3, Settings,
  Zap, LayoutTemplate, LogOut, Sun, Moon, Sparkles,
  ChevronLeft, ChevronRight, Command,
} from 'lucide-react';
import type { Page } from '../../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
  onOpenCmd: () => void;
}

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, page: 'dashboard'        as Page },
  { label: 'Quotes',           icon: FileText,         page: 'quotes'           as Page },
  { label: 'Clients',          icon: Users,            page: 'clients'          as Page },
  { label: 'Proposal Builder', icon: Wand2,            page: 'proposal-builder' as Page },
  { label: 'Templates',        icon: LayoutTemplate,   page: 'templates'        as Page },
  { label: 'Analytics',        icon: BarChart3,        page: 'analytics'        as Page },
];

export function Sidebar({ currentPage, onNavigate, darkMode, onToggleDark, onOpenCmd }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 252 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-full z-30 flex flex-col overflow-hidden
        bg-white dark:bg-[#070C18]
        border-r border-surface-3/70 dark:border-[#0F1D30]"
      style={{ boxShadow: '1px 0 0 rgba(0,0,0,0.04)' }}
    >
      {/* Logo */}
      <div className={`h-[60px] flex items-center flex-shrink-0 border-b border-surface-3/60 dark:border-[#0F1D30] ${collapsed ? 'justify-center' : 'px-5 gap-3'}`}>
        <motion.div
          whileTap={{ scale: 0.88 }}
          onClick={() => onNavigate('dashboard')}
          className="w-8 h-8 rounded-xl flex-shrink-0 cursor-pointer
            bg-gradient-to-br from-brand-400 to-brand-700
            shadow-[0_2px_10px_rgba(26,123,255,0.50)]
            flex items-center justify-center"
        >
          <Zap size={15} className="text-white" fill="white" />
        </motion.div>
        {!collapsed && (
          <div className="min-w-0 leading-none">
            <span className="text-[15px] font-black tracking-tight text-ink dark:text-white">Quotera</span>
            <span className="text-[15px] font-black tracking-tight text-gradient-brand"> AI</span>
          </div>
        )}
      </div>

      {/* Search / Command trigger */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1 flex-shrink-0">
          <button
            onClick={onOpenCmd}
            className="w-full flex items-center gap-2.5 px-3 py-2
              rounded-xl bg-surface-2 dark:bg-[#0D1828]
              border border-surface-3 dark:border-[#1A2B42]
              text-ink-tertiary text-sm
              hover:bg-surface-3 dark:hover:bg-[#111B2E]
              transition-colors"
          >
            <Command size={13} />
            <span className="flex-1 text-left text-xs">Search...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-surface-3 dark:bg-[#1A2B42]">⌘K</kbd>
          </button>
        </div>
      )}
      {collapsed && (
        <div className="px-2 pt-3 flex-shrink-0">
          <button onClick={onOpenCmd} title="Search (⌘K)"
            className="w-full h-9 flex items-center justify-center rounded-xl
              text-ink-tertiary hover:bg-surface-2 dark:hover:bg-[#111B2E] transition-colors">
            <Command size={16} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        {!collapsed && <p className="section-label px-3 py-2">Main Menu</p>}
        {navItems.map((item) => {
          const active = currentPage === item.page;
          return (
            <motion.button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              whileTap={{ scale: 0.97 }}
              title={collapsed ? item.label : undefined}
              className={`nav-item w-full ${collapsed ? 'justify-center px-2' : ''} ${active ? 'nav-item-active' : 'nav-item-idle'}`}
            >
              {active && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute inset-0 rounded-xl
                    bg-brand-50 dark:bg-brand-950/60
                    border border-brand-100 dark:border-brand-900/50"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              <div className={`relative z-10 flex-shrink-0 ${active ? 'text-brand-600 dark:text-brand-400' : ''}`}>
                <item.icon size={17} />
              </div>
              {!collapsed && (
                <span className={`relative z-10 truncate text-sm ${active ? 'font-semibold text-brand-700 dark:text-brand-300' : ''}`}>
                  {item.label}
                </span>
              )}
              {active && !collapsed && (
                <motion.div className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" layoutId="sidebarDot" />
              )}
            </motion.button>
          );
        })}

        {/* AI Banner */}
        {!collapsed && (
          <div className="mt-4 rounded-2xl overflow-hidden relative noise-overlay">
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #001240 0%, #003280 45%, #0052CC 100%)' }} />
            <div className="absolute inset-0 opacity-50"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(64,150,255,0.5) 0%, transparent 70%)' }} />
            <div className="relative z-10 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={12} className="text-accent-300" />
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">AI Copilot</span>
              </div>
              <p className="text-[11px] text-blue-200/60 leading-relaxed mb-3">
                Generate a winning quote in under 30 seconds.
              </p>
              <button
                onClick={() => onNavigate('quotes')}
                className="w-full text-[11px] font-bold text-white py-2 rounded-xl
                  bg-white/10 border border-white/15
                  hover:bg-white/18 transition-colors"
              >
                Try AI Now →
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-surface-3/60 dark:border-[#0F1D30] space-y-0.5 flex-shrink-0">
        {/* Settings */}
        {(() => {
          const active = currentPage === 'settings';
          return (
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate('settings')}
              className={`nav-item w-full relative ${collapsed ? 'justify-center px-2' : ''} ${active ? 'nav-item-active' : 'nav-item-idle'}`}>
              {active && <motion.div layoutId="sidebarActive" className="absolute inset-0 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/50" />}
              <Settings size={17} className="relative z-10 flex-shrink-0" />
              {!collapsed && <span className="relative z-10 text-sm">Settings</span>}
            </motion.button>
          );
        })()}

        <motion.button whileTap={{ scale: 0.97 }} onClick={onToggleDark}
          className={`nav-item w-full nav-item-idle ${collapsed ? 'justify-center px-2' : ''}`}>
          {darkMode ? <Sun size={17} className="text-accent-500 flex-shrink-0" /> : <Moon size={17} className="flex-shrink-0" />}
          {!collapsed && <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </motion.button>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate('login')}
          className={`nav-item w-full text-ink-tertiary hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-red-950/20 ${collapsed ? 'justify-center px-2' : ''}`}>
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </motion.button>

        {/* User chip */}
        {!collapsed && (
          <div className="mt-2 flex items-center gap-2.5 px-3 py-2.5 rounded-2xl
            bg-surface-1 dark:bg-[#0D1828]
            border border-surface-3 dark:border-[#1A2B42]">
            <div className="w-7 h-7 rounded-xl
              bg-gradient-to-br from-brand-400 to-brand-700
              flex items-center justify-center text-white text-xs font-black flex-shrink-0
              shadow-[0_1px_6px_rgba(26,123,255,0.4)]">R</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink dark:text-white truncate">Riya Desai</p>
              <p className="text-[10px] text-ink-tertiary">Pro Plan</p>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[68px] w-7 h-7
          bg-white dark:bg-[#0D1828]
          border border-surface-3 dark:border-[#1A2B42]
          rounded-full flex items-center justify-center
          shadow-md text-ink-tertiary
          hover:text-brand-600 hover:border-brand-300
          transition-colors z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </motion.button>
    </motion.aside>
  );
}
