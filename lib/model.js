import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from 'graphql'
import { mapValues, capitalize } from 'lodash'
import mongojs from 'promised-mongo'
import pluralize from 'pluralize'

Joi.objectid = JoiObjectId

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)
const $ = Joi
const queryFields = {}
const mutationFields = {}
const joiGraphQLTypeMap = {
  string: GraphQLString
}

const model = (name, joiSchema) => {
  const singular = name.toLowerCase()
  const plural = pluralize(singular)
  const attrs = mapValues(joiSchema, (schema, attr) => ({
    description: schema._description,
    type: joiGraphQLTypeMap[schema._type]
  }))
  const ModelType = new GraphQLObjectType({
    name: name,
    description: `${name} model`,
    fields: attrs
  })
  const Model = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => db.collection(plural).findOne(opts)
  }
  const Models = {
    type: new GraphQLList(ModelType),
    args: attrs,
    resolve: (root, opts) => db.collection(plural).find(opts)
  }
  const ModelSave = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => {
      const { error: err, value: data } = Joi.validate(opts, joiSchema)
      if (err) throw new Error(err)
      return db.collection(plural).save(data)
    }
  }
  const ModelDelete = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => db.campaigns.remove(opts)
  }
  queryFields[singular] = Model
  queryFields[plural] = Models
  mutationFields[`update${capitalize(singular)}`] = ModelSave
  mutationFields[`create${capitalize(singular)}`] = ModelSave
  mutationFields[`delete${capitalize(singular)}`] = ModelDelete
}

const schema = () => {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: queryFields
    }),
    mutation: new GraphQLObjectType({
      name: 'RootMutationType',
      fields: mutationFields
    })
  })
}

export { model, $, schema }
