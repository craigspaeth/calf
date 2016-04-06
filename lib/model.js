import Joi from 'joi'
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql'

const model = (name, schema) => {

}

const $ = Joi

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      foo: {
        description: 'Da foos',
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'foo'
      }
    }
  })
})

export { model, $, schema }
