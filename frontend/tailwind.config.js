/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paddy: {
          50: '#f2f8f1',
          100: '#e0eedd',
          200: '#c2ddbc',
          300: '#98c58c',
          400: '#6ea75d',
          500: '#4f8a3f',
          600: '#3c6e30',
          700: '#305729',
          800: '#284523',
          900: '#22391f',
          950: '#0f1f0d',
        },
        husk: {
          50: '#fbf9f3',
          100: '#f4efdf',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 10px 0 rgba(34, 57, 31, 0.08)',
        card: '0 4px 20px 0 rgba(34, 57, 31, 0.10)',
      },
    },
  },
  plugins: [],
}
