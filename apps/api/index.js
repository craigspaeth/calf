import Koa from 'koa'

const app = new Koa()

app.use(async ($) => $.body = 'Api')

export default app
