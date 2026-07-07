import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Sparkles, Settings } from 'lucide-react';
import type { Page } from '../../App';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAI: () => void;
}

const items = [
  { icon: LayoutDashboard, label: 'Home',    page: 'dashboard' as Page },
  { icon: FileText,        label: 'Quotes',  page: 'quotes'    as Page },
  { icon: Sparkles,        label: 'AI',      page: null,       isAI: true },
  { icon: Users,           label: 'Clients', page: 'clients'   as Page },
  { icon: Settings,        label: 'Settings',page: 'settings'  as Page },
];

export function BottomNav({ currentPage, onNavigate, onAI }: BottomNavProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 sm:hidden
        bg-white/90 dark:bg-[#070B14]/95
        backdrop-blur-2xl
        border-t border-surface-3 dark:border-[#0F1A2E]
        flex items-stretch
        shadow-[0_-4px_24px_rgba(12,17,29,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((item) => {
        const isAI = !!(item as any).isAI;
        const active = !isAI && item.page === currentPage;

        if (isAI) {
          return (
            <motion.button
              key="ai"
              whileTap={{ scale: 0.88 }}
              onClick={onAI}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] -mt-5"
            >
              <div className="w-12 h-12 rounded-2xl
                bg-gradient-to-br from-[#3B92FF] to-[#0050CC]
                flex items-center justify-center
                shadow-[0_4px_16px_rgba(26,123,255,0.55)]
                ring-4 ring-white dark:ring-[#070B14]">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 mt-0.5">AI</span>
            </motion.button>
          );
        }

        return (
          <motion.button
            key={item.page!}
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate(item.page!)}
            className={`bottom-nav-item ${active ? 'bottom-nav-item-active' : ''}`}
          >
            <div className="relative">
              <item.icon
                size={22}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-tertiary'}
              />
              {active && (
                <motion.div
                  layoutId="bottomNavDot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                    w-1 h-1 rounded-full bg-brand-500
                    shadow-[0_0_4px_rgba(26,123,255,0.8)]"
                  transition={{ type: 'spring', bounce: 0.3 }}
                />
              )}
            </div>
            <span className={`text-[10px] font-semibold ${active ? 'text-brand-600 dark:text-brand-400' : 'text-ink-tertiary'}`}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
