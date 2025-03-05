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
  plugins: [react(), viteMockServer()],
})
