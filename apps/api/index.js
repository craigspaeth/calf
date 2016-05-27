import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import c from 'koa-convert'
import './models'
import { schema } from 'model'

const app = new Koa()

app.use(async (ctx, next) => {
  return c(graphqlHTTP({
    schema: schema(),
    graphiql: true,
    rootValue: ctx.state
  }))(ctx, next)
})

export default app
