import Koa from 'koa'
import _debug from 'debug'
import mount from 'koa-mount'
import client from './apps/client'
import api from './apps/api'

let debug = _debug('app')
let app = new Koa()
let { PORT } = process.env

app.use(mount('/api', api))
app.use(mount('/', client))
app.listen(PORT)
debug(`Listening on ${PORT}`)
