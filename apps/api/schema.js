import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      foo: {
        type: GraphQLString
      }
    }
  })
})

export default schema
