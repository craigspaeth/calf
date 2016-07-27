import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import c from 'koa-convert'
import schema from './schemas'

const app = new Koa()

app.use(async (ctx, next) => {
  return c(graphqlHTTP({ schema, graphiql: true }))(ctx, next)
})

export default app
