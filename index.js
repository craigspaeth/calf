import Koa from 'koa'
import d from 'debug'

const debug = d('app')
const app = new Koa()
const { PORT } = process.env

app.use(async $ => $.body = 'Hello')
app.listen(PORT)
debug(`Listening on ${PORT}`)
