/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          surface: '#1E293B',
          border: '#334155'
        },
        brand: {
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          blue: '#3B82F6',
          pink: '#EC4899',
          accent: '#00F0FF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'neon-violet': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)'
      }
    },
  },
  plugins: [],
}
