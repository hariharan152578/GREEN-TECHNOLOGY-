// tailwind.config.js

module.exports = {
  // ... other configurations
  theme: {
    extend: {
      animation: {
        // Define a custom animation utility named 'marquee'
        marquee: 'marquee 15s linear infinite', 
      },
      keyframes: {
        // Define the steps for the 'marquee' animation
        marquee: {
          '0%': { transform: 'translateX(100%)' }, // Start fully off-screen to the right
          '100%': { transform: 'translateX(-100%)' }, // End fully off-screen to the left
        },
      },
    },
  },
};