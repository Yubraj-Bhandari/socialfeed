import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: { host: true },
  base: '/socialfeed/', // Must match your repo name
  plugins: [
    react(), 
    tailwindcss(),
    // Plugin to generate 404.html for GitHub Pages
    {
      name: 'generate-404',
      apply: 'build',
      closeBundle: {
        handler() {
          const buildDir = path.resolve(__dirname, 'dist');
          copyFileSync(
            path.join(buildDir, 'index.html'),
            path.join(buildDir, '404.html')
          );
          console.log('✅ 404.html generated for GitHub Pages');
        },
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});