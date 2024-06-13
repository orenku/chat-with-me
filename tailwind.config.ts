/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";
import daisyui from "daisyui"


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    daisyui,
  ],

  // config docs: https://daisyui.com/docs/config/
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#d7d7ff",
        "primary-content": "#0c0b23",
        "secondary": "#151320",
        "secondary-content": "#9596b5",
        "accent": "#fecaca",
        "accent-content": "#ffffff",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
      },
    }, 'lemonade',],
  },
};
export default config;
