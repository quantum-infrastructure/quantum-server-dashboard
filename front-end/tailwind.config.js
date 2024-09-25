/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure paths cover your project's files
  ],
      theme: {
        // extend: {},
        extend: {
          spacing: {
            '1.25': '5px', // Adding a custom spacing value
          },
        },
      },
      plugins: [],
  }

