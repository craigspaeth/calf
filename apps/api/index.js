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
  startAt: $.date().description('Start at date'),
  endAt: $.date().description('End at date'),
  channels: $.array().items($.string())
    .description('Channels to filter campaign to, like tags.')
})

model('User', {
  name: $.string().description('Name of user'),
  email: $.string().email().description('User email')
})

app.use(async (ctx, next) => {
  return c(graphqlHTTP({
    schema: schema(),
    graphiql: true,
    rootValue: ctx.state
  }))(ctx, next)
})

export default app
