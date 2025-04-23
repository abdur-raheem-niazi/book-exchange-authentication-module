/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/partials/**/*.ejs",
    "./views/admin/**/*.ejs",
    "./public/css/**/*.css",
    "./public/js/**/*.js", // Added JavaScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
