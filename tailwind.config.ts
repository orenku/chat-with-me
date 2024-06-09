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
    themes: ['acid', 'light', 'dark', 'coffee', 'lemonade', 'business', 'pastel'],
  },
};
export default config;
