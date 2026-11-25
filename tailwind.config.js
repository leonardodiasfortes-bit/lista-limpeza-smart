/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',
        ink: '#0F172A',
        emerald: {
          DEFAULT: '#059669',
          dark: '#047857',
          light: '#D1FAE5',
        },
        navy: {
          DEFAULT: '#1E40AF',
          dark: '#1E3A8A',
          light: '#DBEAFE',
        },
        amber: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
        },
        alert: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      fontSize: {
        base: '18px',
      },
    },
  },
  plugins: [],
}
