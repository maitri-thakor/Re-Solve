/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        "ourdarktheme": {
          "primary": "#303030",
          "secondary": "#222327",
          "accent": "#f4c525", // #DAAA0B #f4c525
          "neutral": "#16181c",
          "base-100": "#222222", // text? #EAE9FC or #FCF7E9
        },
      },
      {
        "ourlighttheme": {
          "primary": "#222327",
          "secondary": "#facc15",
          "accent": "#f4c525", // #DAAA0B #f4c525
          "neutral": "#16181c",
          "base-100": "#222222", // text? #EAE9FC or #FCF7E9
        },
      },
      "dark",
      "cupcake",
      "pastel"
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
