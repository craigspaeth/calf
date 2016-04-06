import Koa from 'koa'
import browserify from 'b-middleware'
import render from 'render-server'
import routes from './routes'
import layout from './views/layout'

const app = new Koa()

app.use(browserify({ src: __dirname }))
app.use(render({ layout: layout }))
app.use(routes()())

export default app
