import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(12deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        "sway-reverse": {
          "0%, 100%": { transform: "rotate(-12deg)" },
          "50%": { transform: "rotate(-15deg)" },
        },
        "sway-slow": {
          "0%, 100%": { transform: "rotate(45deg) translateY(0)" },
          "50%": { transform: "rotate(47deg) translateY(-10px)" },
        },
        "sway-slow-reverse": {
          "0%, 100%": { transform: "rotate(-45deg) translateY(0)" },
          "50%": { transform: "rotate(-47deg) translateY(-10px)" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        sway: "sway 4s ease-in-out infinite",
        "sway-reverse": "sway-reverse 4s ease-in-out infinite",
        "sway-slow": "sway-slow 6s ease-in-out infinite",
        "sway-slow-reverse": "sway-slow-reverse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
