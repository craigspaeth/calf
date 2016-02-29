import User from './user'
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: User
    }
  })
})

export default schema
