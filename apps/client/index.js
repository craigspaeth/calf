import Koa from 'koa'

const app = new Koa()

app.use(async ($) => $.body = 'Client')

export default app
