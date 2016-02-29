import Koa from 'koa'
import Layout from 'components/layout'
import { renderToString } from 'react-dom/server'

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = renderToString(Layout({ title: 'Foo' }))
})

export default app
