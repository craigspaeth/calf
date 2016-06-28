import Koa from 'koa'
import _debug from 'debug'
import mount from 'koa-mount'
import editCampaign from './apps/edit-campaign'
import campaigns from './apps/campaigns'
import adbuilder from './apps/adbuilder'
import api from './apps/api'
import auth from './apps/auth'
import onerror from 'onerror'
import path from 'path'
import browserify from 'b-middleware'

const debug = _debug('app')
const app = new Koa()
const { PORT } = process.env

app.use(onerror)
app.use(mount(auth))
app.use(mount('/api', api))
app.use(browserify({ src: path.resolve(__dirname, './apps') }))
app.use(mount(campaigns))
app.use(mount(adbuilder))
app.use(mount(editCampaign))
app.listen(PORT)
debug(`Listening on ${PORT}`)
