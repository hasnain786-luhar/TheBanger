import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Command } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { TopAppBar } from './TopAppBar';
import { MobileDrawer } from './MobileDrawer';
import { BottomNav } from './BottomNav';
import { CommandPalette } from '../CommandPalette';
import { AICopilot } from '../AICopilot';
import type { Page } from '../../App';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const showBack: Page[] = ['quote-editor'];

export function AppLayout({ children, currentPage, onNavigate, darkMode, onToggleDark }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-1 dark:bg-[#060B14]">

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={(p) => { onNavigate(p); setCmdOpen(false); }} />

      {/* AI Copilot */}
      <AICopilot open={aiOpen} onClose={() => setAiOpen(false)} />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
          onOpenCmd={() => setCmdOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
        darkMode={darkMode}
        onToggleDark={onToggleDark}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[252px]">
        <div className="hidden lg:block">
          <Topbar currentPage={currentPage} onNavigate={onNavigate} onOpenCmd={() => setCmdOpen(true)} />
        </div>
        <div className="lg:hidden">
          <TopAppBar
            currentPage={currentPage}
            onMenuOpen={() => setDrawerOpen(true)}
            onNavigate={onNavigate}
            showBack={showBack.includes(currentPage)}
          />
        </div>

        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 overflow-y-auto"
        >
          <div className="page-container">{children}</div>
        </motion.main>
      </div>

      {/* Bottom Nav (mobile) */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={onNavigate}
        onAI={() => setAiOpen(o => !o)}
      />

      {/* AI Floating Button (desktop) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setAiOpen(o => !o)}
        className="fixed z-30 bottom-6 right-6 hidden lg:flex items-center gap-2.5
          px-4 h-11 rounded-2xl font-bold text-sm text-white
          bg-gradient-to-br from-brand-500 to-brand-700
          shadow-[0_4px_20px_rgba(26,123,255,0.50),0_1px_0_rgba(255,255,255,0.12)_inset]
          transition-all"
      >
        <Sparkles size={16} />
        AI Copilot
        <span className="ml-0.5 px-1.5 py-0.5 rounded-lg bg-white/15 text-[10px] font-bold">β</span>
      </motion.button>

      {/* FAB (mobile) */}
      <AnimatePresence>
        {currentPage !== 'quote-editor' && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.4 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onNavigate('quote-editor')}
            className="fab lg:hidden"
          >
            <Plus size={19} />
            <span>Create Quote</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
