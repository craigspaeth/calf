import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from 'graphql'
import { mapValues, capitalize, includes } from 'lodash'
import mongojs, { ObjectId } from 'promised-mongo'
import pluralize from 'pluralize'

Joi.objectid = JoiObjectId(Joi)

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)
const $ = Joi
const queryFields = {}
const mutationFields = {}

const joiGraphQLTypeMap = {
  string: GraphQLString,
  date: GraphQLString
}

const joiToGraphQLType = (schema) => {
  if (includes(['string', 'date'], schema._type)) {
    return joiGraphQLTypeMap[schema._type]
  }
  if (schema._type === 'array') {
    const innerType = joiGraphQLTypeMap[schema._inner.items[0]._type]
    return new GraphQLList(innerType)
  }
}

const model = (name, joiSchema) => {
  if (!joiSchema._id) joiSchema._id = $.objectid().description('Unique ID')
  const singular = name.toLowerCase()
  const plural = pluralize(singular)
  const col = db.collection(plural)
  const attrs = mapValues(joiSchema, (schema, attr) => {
    console.log(joiToGraphQLType(schema))
    return {
      description: schema._description,
      type: joiToGraphQLType(schema)
    }
  })
  const validate = (opts) => {
    const { error: err, value: data } = Joi.validate(opts, joiSchema)
    if (err) throw new Error(err)
    const typecasted = mapValues(data, (val, attr) => {
      const test = joiSchema[attr]._tests[0]
      const isObjectId = test && test.arg.toString() === '/^[0-9a-fA-F]{24}$/'
      return isObjectId ? ObjectId(val) : val
    })
    return typecasted
  }
  const ModelType = new GraphQLObjectType({
    name: name,
    description: `${name} model`,
    fields: attrs
  })
  const Model = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => col.findOne(validate(opts))
  }
  const Models = {
    type: new GraphQLList(ModelType),
    args: attrs,
    resolve: (root, opts) => col.find(validate(opts))
  }
  const ModelSave = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => col.save(validate(opts))
  }
  const ModelDelete = {
    type: ModelType,
    args: attrs,
    resolve: (root, opts) => col.remove(validate(opts))
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
