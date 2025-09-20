/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Original Dark Mode Theme ---
        'base-100': '#111827',      // Dark blue-gray background
        'base-200': '#1F2937',      // Lighter card background
        'base-300': '#374151',      // Border, table header
        'text-primary': '#E5E7EB',   // Light gray text
        'text-secondary': '#9CA3AF', // Darker gray text
      },
    },
  },
  plugins: [],
}