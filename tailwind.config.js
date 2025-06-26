module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hatena: '#00aaff',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1e293b',
            a: {
              color: '#00aaff',
              '&:hover': { color: '#008ecc' },
            },
            code: { color: '#d63384' },
            blockquote: {
              color: '#4a5568',
              borderLeftColor: '#cbd5e0',
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
