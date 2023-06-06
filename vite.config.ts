// /// <reference types="vitest" />
// /// <reference types="vite/client"/>


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       external: ['react', 'react-dom'],
//     }
//   },

//   resolve: {
   
//   },
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
})
