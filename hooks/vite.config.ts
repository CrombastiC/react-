import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'
import mockjs from 'mockjs'
import url from 'node:url'
//1.vite插件
const viteMockServer = (): Plugin => {
  return {
    name: 'vite-mock-server',
    configureServer(server: any) {
      server.middlewares.use('/api/list', (req, res) => {
        const parseUrl = url.parse(req.originalUrl, true).query
        res.setHeader('Content-Type', 'application/json')
        const data = mockjs.mock({
          'list|1000': [{
            'id|+1': 1,
            name: parseUrl.keyword,
            'address': '@county(true)',
          }]
        })
        res.end(JSON.stringify(data))
      })
    },
  }
}
// https://vite.dev/config/
export default defineConfig({
  css:{
    modules:{
      //开启css模块化
      localsConvention:'dashes',//带-的转换为驼峰，保留之前的类名
      // localsConvention:'dashesOnly',//带-的转换为驼峰，移除之前的类名
      // localsConvention:'camelCaseOnly',//非驼峰转驼峰，移除之前的类名
      // localsConvention:'camelCase',//非驼峰转驼峰，保留之前的类名

      generateScopedName:'[name]__[local]___[hash:base64:5]'//自定义类名 name 文件名 local 类名 hash:base64:5 5位hash值
    }
  },
  plugins: [react(), viteMockServer()],
})
