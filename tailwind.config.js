/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ── Brand: Deep Azure — not generic blue, not purple ── */
        brand: {
          50:  '#EEF5FF',
          100: '#D9EAFF',
          200: '#BBD7FF',
          300: '#8ABBFF',
          400: '#4D9BFF',
          500: '#1A7BFF',   /* Primary CTA — vivid azure */
          600: '#0062E6',   /* Hover */
          700: '#004DBD',
          800: '#003A96',
          900: '#002D7A',
          950: '#001A52',
        },
        /* ── Accent: Warm Saffron-Gold (unique to design/luxury SaaS) ── */
        accent: {
          50:  '#FFFBEB',
          100: '#FFF3C4',
          200: '#FFE580',
          300: '#FFD233',
          400: '#FFBE00',
          500: '#F5A800',   /* Main accent — warm premium gold */
          600: '#D98B00',
          700: '#B36D00',
          800: '#8C5200',
          900: '#5C3500',
        },
        /* ── Teal: Cool secondary for charts & highlights ── */
        teal: {
          50:  '#EDFCF9',
          100: '#D0F7F0',
          200: '#A3EDE3',
          300: '#5CDECF',
          400: '#23C9BB',
          500: '#0BADA0',
          600: '#088A84',
          700: '#096E69',
          800: '#0A5754',
          900: '#0B4745',
        },
        /* ── Surface: Very slightly warm whites — feels premium ── */
        surface: {
          0: '#FFFFFF',
          1: '#F9FAFB',     /* Page background — slightly warmer than cold slate */
          2: '#F2F4F7',     /* Card insets, inputs */
          3: '#E4E7EC',     /* Borders */
          4: '#CDD2DB',     /* Strong borders */
        },
        /* ── Ink: Rich warm-tinted darks ── */
        ink: {
          DEFAULT:   '#0C111D',   /* Near-black, warm tint */
          secondary: '#4B5565',   /* Secondary text */
          tertiary:  '#8A94A6',   /* Placeholder, captions */
          inverse:   '#FFFFFF',
        },
        success: {
          DEFAULT: '#12B76A',
          50:  '#ECFDF3',
          100: '#D1FAE5',
          500: '#12B76A',
          700: '#027A48',
        },
        warning: {
          DEFAULT: '#F5A800',
          50:  '#FFFBEB',
          100: '#FFF3C4',
          500: '#F5A800',
          700: '#B54708',
        },
        danger: {
          DEFAULT: '#F04438',
          50:  '#FEF3F2',
          100: '#FEE4E2',
          500: '#F04438',
          700: '#B42318',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '32px',
      },
      boxShadow: {
        'xs':         '0 1px 2px 0 rgba(12,17,29,0.04)',
        'sm':         '0 1px 3px rgba(12,17,29,0.06), 0 1px 2px -1px rgba(12,17,29,0.04)',
        'md':         '0 4px 12px -2px rgba(12,17,29,0.08), 0 2px 4px -2px rgba(12,17,29,0.05)',
        'lg':         '0 12px 32px -4px rgba(12,17,29,0.10), 0 4px 8px -4px rgba(12,17,29,0.06)',
        'xl':         '0 24px 48px -8px rgba(12,17,29,0.14)',
        '2xl':        '0 40px 80px -16px rgba(12,17,29,0.18)',
        /* Card shadow: subtle ring + depth */
        'card':       '0 0 0 1px rgba(12,17,29,0.06), 0 2px 8px -2px rgba(12,17,29,0.07)',
        'card-hover': '0 0 0 1px rgba(26,123,255,0.15), 0 8px 32px -4px rgba(12,17,29,0.12)',
        /* Brand glow for CTA buttons */
        'glow-brand': '0 0 0 3px rgba(26,123,255,0.18), 0 8px 24px -4px rgba(26,123,255,0.35)',
        'glow-gold':  '0 0 0 3px rgba(245,168,0,0.20), 0 8px 24px -4px rgba(245,168,0,0.28)',
        'glow-teal':  '0 0 0 3px rgba(11,173,160,0.18), 0 8px 24px -4px rgba(11,173,160,0.28)',
        'inset':      'inset 0 2px 4px rgba(12,17,29,0.04)',
        /* Glass depth */
        'glass':      '0 4px 24px rgba(12,17,29,0.08), 0 1px 0 rgba(255,255,255,0.6) inset',
      },
      backgroundImage: {
        /* Hero gradients */
        'hero-brand': 'linear-gradient(135deg, #003A96 0%, #0062E6 40%, #1A7BFF 100%)',
        'hero-mesh':  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,123,255,0.18) 0%, transparent 70%)',
        /* Card accent tops */
        'card-brand-top': 'linear-gradient(180deg, rgba(26,123,255,0.06) 0%, transparent 100%)',
        'card-gold-top':  'linear-gradient(180deg, rgba(245,168,0,0.06) 0%, transparent 100%)',
        'card-teal-top':  'linear-gradient(180deg, rgba(11,173,160,0.06) 0%, transparent 100%)',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
