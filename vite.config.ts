import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Tauri membutuhkan port yang statis agar window desktop tahu ke mana harus mengarah
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      // Mengurangi beban kerja chokidar di Linux agar hot-reload tidak macet
      usePolling: true,
    },
  },
  
  // Menghindari Vite dari mengosongkan layar saat terjadi error kompilasi internal
  clearScreen: false,
});