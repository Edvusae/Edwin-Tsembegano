// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // <-- CRITICAL
    "./src/**/*.{html,js,ts}", // <-- CRITICAL
  ],
  // ... rest of config
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00ADB5', // Ensure these colors exist
        'brand-secondary': '#393E46', 
        'brand-background': '#EEEEEE',
      },
    },
  },
}