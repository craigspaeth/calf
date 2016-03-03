import Koa from 'koa'
import Layout from 'components/layout'
import browserify from 'koa-browserify-middleware'
import c from 'koa-convert'
import { renderToString } from 'react-dom/server'
import { get } from 'koa-route'

let app = new Koa()

app.use(c(get('/client.js', c(browserify(
  __dirname + '/client.js',
  { transform: ['babelify', 'envify'] }
)))))
app.use(async (ctx) => {
  ctx.body = renderToString(Layout({ title: 'Foo' }))
})

export default app
