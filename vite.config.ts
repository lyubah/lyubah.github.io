import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    rollupOptions: {
      input: "index.source.html",
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "";

          if (/\.css$/.test(name)) {
            return "assets/app.css";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
