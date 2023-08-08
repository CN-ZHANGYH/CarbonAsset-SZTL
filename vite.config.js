import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', //目标url
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
        //重写路径,替换/api
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/], // 添加 include 配置
      imports: [
        'vue',
        {
          'naive-ui': [
            {
              name: 'useDialog',
              importName: 'useDialog'
            },
            {
              name: 'useMessage',
              importName: 'useMessage'
            },
            {
              name: 'useNotification',
              importName: 'useNotification'
            },
            {
              name: 'useLoadingBar',
              importName: 'useLoadingBar'
            }
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      'vue-router': 'vue-router/dist/vue-router.esm-bundler.js',
    }
  },

})
