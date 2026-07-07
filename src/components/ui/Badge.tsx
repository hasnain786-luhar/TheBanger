import type { QuoteStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: QuoteStatus | 'default' | 'info';
  className?: string;
  dot?: boolean;
}

const variantMap: Record<string, string> = {
  draft:    'badge-draft',
  sent:     'badge-sent',
  accepted: 'badge-accepted',
  rejected: 'badge-rejected',
  expired:  'badge-expired',
  default:  'badge-draft',
  info:     'badge bg-brand-50 text-brand-700 ring-1 ring-brand-200/60 dark:bg-brand-950/60 dark:text-brand-300',
};

const dotColor: Record<string, string> = {
  draft:    'bg-[#8A94A6]',
  sent:     'bg-brand-500 shadow-[0_0_4px_rgba(26,123,255,0.7)]',
  accepted: 'bg-teal-500 shadow-[0_0_4px_rgba(11,173,160,0.7)]',
  rejected: 'bg-danger-500',
  expired:  'bg-accent-500',
  default:  'bg-[#8A94A6]',
  info:     'bg-brand-500',
};

export function Badge({ children, variant = 'default', className = '', dot = false }: BadgeProps) {
  return (
    <span className={`${variantMap[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor[variant]}`} />}
      {children}
    </span>
  );
}
