import Koa from 'koa'
import browserify from 'b-middleware'
import render from 'render-server'
import router from './router'
import layout from './views/layout'

const app = new Koa()

app.use(browserify({ src: __dirname }))
app.use(render({ layout: layout }))
app.use(router())

export default app
