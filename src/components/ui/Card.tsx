import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glass?: boolean;
}

const paddingMap: Record<string, string> = {
  none: '',
  sm:   'p-4 sm:p-5',
  md:   'p-5 sm:p-6',
  lg:   'p-6 sm:p-8',
};

export function Card({ children, className = '', onClick, hover = false, padding = 'md', glass = false }: CardProps) {
  const base = glass ? 'card-glass' : hover ? 'card-hover' : 'card';
  const pad  = paddingMap[padding] ?? '';

  if (hover || onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: [0.4,0,0.2,1] }}
        className={`${base} ${pad} ${className} cursor-pointer`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${base} ${pad} ${className}`}>
      {children}
    </div>
  );
}
