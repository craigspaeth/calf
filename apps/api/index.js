import Koa from 'koa'
import convert from 'koa-convert'
import graphqlHTTP from 'koa-graphql'
import schema from './schema'

const app = new Koa()

app.use(convert(graphqlHTTP({ schema: schema, graphiql: true })))

export default app
