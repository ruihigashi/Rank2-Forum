/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src配下にあるReactのソースコードを対象化
    "./public/index.html", // 一応index.htmlも対象に    
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

