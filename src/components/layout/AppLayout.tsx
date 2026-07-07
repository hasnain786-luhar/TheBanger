import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { TopAppBar } from './TopAppBar';
import { MobileDrawer } from './MobileDrawer';
import { BottomNav } from './BottomNav';
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

  return (
    <div className="flex h-screen overflow-hidden bg-surface-1 dark:bg-[#070B14]">

      {/* ── Desktop Sidebar ─────────────────────────── */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
        />
      </div>

      {/* ── Mobile Drawer ───────────────────────────── */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
        darkMode={darkMode}
        onToggleDark={onToggleDark}
      />

      {/* ── Main Content ────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[252px]">

        {/* Desktop topbar */}
        <div className="hidden lg:block">
          <Topbar currentPage={currentPage} onNavigate={onNavigate} />
        </div>

        {/* Mobile / tablet top app bar */}
        <div className="lg:hidden">
          <TopAppBar
            currentPage={currentPage}
            onMenuOpen={() => setDrawerOpen(true)}
            onNavigate={onNavigate}
            showBack={showBack.includes(currentPage)}
          />
        </div>

        {/* Scrollable page */}
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 overflow-y-auto"
        >
          <div className="page-container">
            {children}
          </div>
        </motion.main>
      </div>

      {/* ── Bottom Nav (mobile) ──────────────────────── */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={onNavigate}
        onAI={() => onNavigate('proposal-builder')}
      />

      {/* ── FAB ─────────────────────────────────────── */}
      <AnimatePresence>
        {currentPage !== 'quote-editor' && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.38, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => onNavigate('quote-editor')}
            className="fab sm:hidden"
          >
            <Plus size={20} />
            <span>Create Quote</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
