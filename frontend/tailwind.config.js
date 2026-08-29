/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBFAF7',
          100: '#F6F1EA',
          200: '#EDE4D6',
          300: '#E4DCD0',
        },
        ink: {
          DEFAULT: '#161513',
          muted: '#5C574F',
          soft: '#8A847A',
        },
        noviq: {
          DEFAULT: '#C2410C',
          dark: '#9A3412',
          light: '#F3D5C7',
        },
        service: {
          branding: '#E85D4C',
          uiux: '#7C3AED',
          development: '#2563EB',
          automation: '#059669',
          analysis: '#B45309',
          landscape: '#4D7C0F',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        display: ['clamp(2.4rem, 6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        heading: ['clamp(1.8rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        section: '6.5rem',
      },
      maxWidth: {
        container: '72rem',
        wide: '80rem',
      },
      borderRadius: {
        card: '1.25rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 12px 40px rgba(22, 21, 19, 0.06)',
        lift: '0 18px 50px rgba(22, 21, 19, 0.10)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
