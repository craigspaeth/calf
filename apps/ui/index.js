import Koa from 'koa'
import browserify from 'koa-browserify-middleware'
import c from 'koa-convert'
import { get } from 'koa-route'
import render from 'render-server'
import router from './router'
import layout from './views/layout'

let app = new Koa()

app.use(c(get('/client.js', c(browserify(
  __dirname + '/client.js',
  { transform: ['babelify', 'brfs', 'envify'] }
)))))
app.use(render({ layout: layout }))
app.use(router())

export default app
