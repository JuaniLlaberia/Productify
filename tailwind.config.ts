import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'background-1': 'var(--background-1)',
        'background-2': 'var(--background-2)',
        'background-3': 'var(--background-3)',
        'background-hover-1': 'var(--background-hover-1)',
        'background-hover-2': 'var(--background-hover-2)',
        'background-danger': 'var(--background-danger)',
        'background-contrast': 'var(--background-contrast)',
        'background-contrast-hover': 'var(--background-contrast-hover)',
        'background-overlay': 'var(--background-overlay)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-contrast': 'var(--text-contrast)',
        'text-hover': 'var(--text-hover)',
        'text-danger': 'var(--text-danger)',
        'border-1': 'var(--border)',
        special: 'var(--special)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config;

export default config;
