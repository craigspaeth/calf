import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import c from 'koa-convert'
import './models'
import { schema } from 'model'

const { PORT } = process.env
const app = new Koa()

app.use(async (ctx, next) => {
  return c(graphqlHTTP({
    schema: schema(),
    graphiql: true,
    rootValue: ctx.state
  }))(ctx, next)
})

export default app

if (require.main) {
  app.listen(PORT)
  console.log(`Listening ${PORT}`)
}
