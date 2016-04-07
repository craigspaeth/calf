import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import c from 'koa-convert'
import { model, schema, $ } from 'model'
// import schema from './schema'
// import jwt from 'koa-jwt'
// const { AUTH0_SECRET, AUTH0_ID } = process.env
// app.use(c(jwt({
//   secret: new Buffer(AUTH0_SECRET, 'base64'),
//   audience: AUTH0_ID
// })))

const app = new Koa()

model('Campaign', {
  name: $.string().description('Name of campaign'),
  startAt: $.string().description('Start at date'),
  endAt: $.string().description('End at date')
})

app.use(async (ctx, next) => {
  return c(graphqlHTTP({
    schema: schema(),
    graphiql: true,
    rootValue: ctx.state
  }))(ctx, next)
})

export default app
