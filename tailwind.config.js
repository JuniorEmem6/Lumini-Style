module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5",   // Indigo
          secondary: "#10B981", // Emerald
          accent: "#F59E0B",    // Amber
          dark: "#1F2937",      // Gray-800
          light: "#F3F4F6",     // Gray-100
        },

        transitionProperty: {
            'height': 'height',
            'spacing': 'margin, padding',
          }
      },
    },
    plugins: [],
  };