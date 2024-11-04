import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#080708',
          secondary: '#E6E8E6',
          accent: '#001F66',
          neutral: '#F4F5F4',
          'base-100': '#ffffff',
        },
      },
      'light',
    ],
  },
  plugins: [daisyui],
};
