import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",  // Make sure the base path is correctly set
  build: {
    outDir: "dist",  // Ensure the output directory is "dist"
  },
})
