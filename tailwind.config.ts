import type { Config } from 'tailwindcss'
const config: Config = {
  // darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#7417EA',
          600: '#5A12B6',
          700: '#4B0F98',
        },
      },
      // fontes, sombras suaves, etc.
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.35)',
      },
    },
  },
  // plugins: [require('tailwindcss-animate')],
}
export default config
