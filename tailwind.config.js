// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Path to all your component files
//   ],

//   theme: {
//     extend: {
//       fontFamily: {
//         raleway: ['Raleway', 'sans-serif'], // 👈 Custom font utility
//       },
//       colors: {
//         darkblue: '#233142', // 👈 custom dark theme color
//       },
//     }, // Extend the theme as needed
//   },
//   plugins: [
//     require("daisyui"), // Include DaisyUI as a plugin
//   ],
//   daisyui: {
//     themes: ["light", "dark", "synthwave"], 
   
//     base: true, // Enable base styles
//     utils: true, // Enable utility classes
//     logs: true, // Enable console logs
//     rtl: false, // Disable right-to-left mode
//     prefix: "", // No prefix for DaisyUI classes
//     darkTheme: "light", // Default dark mode theme
//   },
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to all your component files
  ],

  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // 👈 Custom font utility
      },
      colors: {
        // darkblue: '#233142', 
        darkblue: '#222244', 
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },

  plugins: [
    require("daisyui"), // Include DaisyUI as a plugin
  ],
  daisyui: {
    themes: ["light", "dark", "synthwave"], 
    base: true, // Enable base styles
    utils: true, // Enable utility classes
    logs: true, // Enable console logs
    rtl: false, // Disable right-to-left mode
    prefix: "", // No prefix for DaisyUI classes
    darkTheme: "light", // Default dark mode theme
  },
};
