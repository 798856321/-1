import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
   plugins: [vue()],
   //解决“vite use `--host` to expose”
   base: './',
   // server: {
   //    // host: '0.0.0.0',
   //    port: 8080,
   //    open: true,
   //    proxy: {
   //       '/api': {
   //          target: 'localhost:8080', // 凡是遇到 /api 路径的请求，都映射到 target 属性
   //          changeOrigin: true,
   //          rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
   //       }
   //    }
   // },
   resolve: {
      //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
      alias: [
         {
            find: '@',
            replacement: resolve(__dirname, 'src')
         }
      ]
   }
})
