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

const model = (name, { schema, saveSchema }) => {
  if (!schema._id) schema._id = $.objectid().description('Unique ID')
  const singular = name.toLowerCase()
  const plural = pluralize(singular)
  const col = db.collection(plural)
  const fields = mapValues(schema, (schema, attr) => {
    return {
      description: schema._description,
      type: joiToGraphQLType(schema)
    }
  })
  const validate = (method, attrs) => {
    const schm = {
      create: saveSchema,
      read: schema,
      update: saveSchema,
      delete: schema
    }[method]
    const opts = {
      create: { stripUnknown: true },
      read: {},
      update: { stripUnknown: true },
      delete: {}
    }[method]
    const { error: err, value: data } = Joi.validate(attrs, schm, opts)
    if (err) throw new Error(err)
    const typecasted = mapValues(data, (val, attr) => {
      const test = schema[attr]._tests[0]
      const isObjectId = test && test.arg.toString() === '/^[0-9a-fA-F]{24}$/'
      return isObjectId ? ObjectId(val) : val
    })
    return typecasted
  }
  const ModelType = new GraphQLObjectType({
    name: name,
    description: `${name} model`,
    fields: fields
  })
  const Model = {
    type: ModelType,
    args: fields,
    resolve: (root, opts) => col.findOne(validate('read', opts))
  }
  const Models = {
    type: new GraphQLList(ModelType),
    args: fields,
    resolve: (root, opts) => col.find(validate('read', opts))
  }
  const ModelSave = {
    type: ModelType,
    args: fields,
    resolve: (root, opts) => col.save(validate('update', opts))
  }
  const ModelDelete = {
    type: ModelType,
    args: fields,
    resolve: (root, opts) => col.remove(validate('delete', opts))
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
