import Koa from 'koa'
import _debug from 'debug'
import mount from 'koa-mount'
import ui from './apps/ui'
import api from './apps/api'
import auth from './middleware/auth'
import render from './middleware/render'

let debug = _debug('app')
let app = new Koa()
let { PORT } = process.env

app.use(render)
app.use(auth)
app.use(mount('/api', api))
app.use(mount('/', ui))
app.listen(PORT)
debug(`Listening on ${PORT}`)
