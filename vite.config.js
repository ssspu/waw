import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 5100,
    proxy: {
      '/backend': {
        target: 'https://bioflex.cn',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/backend/, '/api')
      }
    }
  }
})
