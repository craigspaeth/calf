import Koa from 'koa'
import browserify from 'b-middleware'
import routes from './routes'

const app = new Koa()

app.use(browserify({ src: __dirname }))
app.use(routes())

export default app
