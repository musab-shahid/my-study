/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Semantic status
        success: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        danger: {
          50:  '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      borderRadius: {
        'card': '0.75rem',   // 12px — calmer, less bubble-app
        'btn':  '0.625rem',  // 10px
        'chip': '9999px',
      },
      boxShadow: {
        'card':     '0 1px 2px 0 rgb(15 23 42 / 0.04)',
        'card-hover': '0 2px 8px -2px rgb(15 23 42 / 0.08)',
        'glow-brand': '0 0 0 1px rgb(3 105 161 / 0.12)',
        'glow-indigo': '0 0 0 1px rgb(67 56 202 / 0.12)',
      },
      maxWidth: {
        content: '56rem',       /* standard workspace */
        reading: '42rem',       /* prose / topic reader */
        wide: '72rem',          /* dashboard / catalogs */
        analytics: '80rem',     /* charts */
        focused: '36rem',       /* active quiz */
      },
      transitionDuration: {
        'DEFAULT': '150ms',
        'fast': '100ms',
        'medium': '200ms',
        'slow': '300ms',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
        'slide-in-left': 'slideInLeft 0.35s ease-out both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.15)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(99, 102, 241, 0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
    },
  },
  plugins: [],
};
