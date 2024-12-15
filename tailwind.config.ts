module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // App Routerの構造を反映
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem", // すべてのページに同じ余白を適用
      },
    },
  },
  plugins: [],
};
