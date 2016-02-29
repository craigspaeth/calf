import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import schema from './schema'
import convert from 'koa-convert'

let app = new Koa()

app.use(convert(graphqlHTTP({ schema: schema, graphiql: true })))

export default app
