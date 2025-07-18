import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

console.log('VITE_API_URL:', process.env.VITE_API_URL);


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  define: {
    // Pass env var to client-side code here
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
})
