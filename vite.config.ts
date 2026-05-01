import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // This helps ensure Vite sees the variables during the Vercel build.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:5000',
      },
    },
    // This ensures the variables are available to your code
    define: {
      'process.env': env
    }
  }
})