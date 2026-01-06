import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Добавляем эту строку, чтобы пути к файлам были относительными
      base: './', 
      
      plugins: [react()],
      
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      resolve: {
        alias: {
          // Исправляем алиас, чтобы он корректно указывал на папку src или корень
          '@': path.resolve(__dirname, './src'),
        }
      },
      
      // Убираем жесткую привязку к порту 3000 для деплоя
      server: {
        host: true,
      }
    };
});

