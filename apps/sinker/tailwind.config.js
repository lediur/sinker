const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind");
const { fontFamily } = require("tailwindcss/defaultTheme");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-mono-jb)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
