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
          50:  'rgb(var(--color-brand-50) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100) / <alpha-value>)',
          200: 'rgb(var(--color-brand-200) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300) / <alpha-value>)',
          400: 'rgb(var(--color-brand-400) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)', // primary
          600: 'rgb(var(--color-brand-600) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700) / <alpha-value>)',
          800: 'rgb(var(--color-brand-800) / <alpha-value>)',
          900: 'rgb(var(--color-brand-900) / <alpha-value>)',
        },
        // Semantic status
        success: {
          50:  'rgb(var(--color-success-50) / <alpha-value>)',
          100: 'rgb(var(--color-success-100) / <alpha-value>)',
          500: 'rgb(var(--color-success-500) / <alpha-value>)',
          600: 'rgb(var(--color-success-600) / <alpha-value>)',
          700: 'rgb(var(--color-success-700) / <alpha-value>)',
        },
        warning: {
          50:  'rgb(var(--color-warning-50) / <alpha-value>)',
          100: 'rgb(var(--color-warning-100) / <alpha-value>)',
          500: 'rgb(var(--color-warning-500) / <alpha-value>)',
          600: 'rgb(var(--color-warning-600) / <alpha-value>)',
          700: 'rgb(var(--color-warning-700) / <alpha-value>)',
        },
        danger: {
          50:  'rgb(var(--color-danger-50) / <alpha-value>)',
          100: 'rgb(var(--color-danger-100) / <alpha-value>)',
          500: 'rgb(var(--color-danger-500) / <alpha-value>)',
          600: 'rgb(var(--color-danger-600) / <alpha-value>)',
          700: 'rgb(var(--color-danger-700) / <alpha-value>)',
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
        'glow-brand': '0 0 0 1px rgb(var(--color-brand-700) / 0.12)',
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
