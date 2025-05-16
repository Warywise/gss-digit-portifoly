import type { Config as TailwindConfig } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',

        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',

        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',

        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',

        text: 'var(--color-text)',
        'subtle-text': 'var(--color-subtle-text)',
        placeholder: 'var(--color-placeholder)',

        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
      },
    },
  },
  plugins: [],
} satisfies TailwindConfig;
