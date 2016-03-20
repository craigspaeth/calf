import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import schema from './schema'
import c from 'koa-convert'
// import jwt from 'koa-jwt'

let app = new Koa()
// let { AUTH0_SECRET, AUTH0_ID } = process.env

// app.use(c(jwt({
//   secret: new Buffer(AUTH0_SECRET, 'base64'),
//   audience: AUTH0_ID
// })))
app.use(async (ctx, next) => {
  return c(graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: ctx.state
  }))(ctx, next)
})

export default app
