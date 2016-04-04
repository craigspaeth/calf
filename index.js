import Koa from 'koa'
import _debug from 'debug'
import mount from 'koa-mount'
import ui from './apps/ui'
import api from './apps/api'
import auth from './apps/auth'
import onerror from 'onerror'

const debug = _debug('app')
const app = new Koa()
const { PORT } = process.env

app.use(mount(auth))
app.use(mount('/api', api))
app.use(mount('/', ui))
app.use(onerror)
app.listen(PORT)
debug(`Listening on ${PORT}`)
