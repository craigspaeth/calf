import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import {
  GraphQLString, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLUnionType,
  GraphQLInputObjectType, GraphQLSchema, GraphQLList
} from 'graphql'
import {
  mapValues, capitalize, includes, isArray, uniqueId, map, fromPairs, find
} from 'lodash'
import mongojs, { ObjectId } from 'promised-mongo'
import pluralize from 'pluralize'

Joi.objectid = JoiObjectId(Joi)

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)
const $ = Joi
const queryFields = {}
const mutationFields = {}

const joiToGraphQLType = (schema, isInput) => {
  if (schema._type === 'number') {
    const isInteger = !!find(schema._tests, (t) => t.name === 'integer')
    return isInteger ? GraphQLInt : GraphQLFloat
  }
  if (includes(['string', 'date'], schema._type)) {
    return GraphQLString
  }
  if (schema._type === 'object') {
    return new (isInput ? GraphQLInputObjectType : GraphQLObjectType)({
      name: `abc${uniqueId()}`,
      description: schema._description,
      fields: fromPairs(map(schema._inner.children, (child) =>
        [child.key, { type: joiToGraphQLType(child.schema, isInput) }]
      ))
    })
  }
  if (schema._type === 'array') {
    const types = map(schema._inner.items, (item) => {
      return joiToGraphQLType(item, isInput)
    })
    console.log('types len', types.length)
    return new GraphQLList(...types)
  }
}

const schemaToFields = (schema, input) => {
  return mapValues(schema, (schema, attr) => {
    return {
      description: schema._description,
      type: joiToGraphQLType(schema, input)
    }
  })
}

const model = (name, { schema = {}, saveSchema = {} }) => {
  if (!schema._id) schema._id = $.objectid().description('Unique ID')
  if (!saveSchema._id) saveSchema._id = $.objectid().description('Unique ID')
  const singular = name.toLowerCase()
  const plural = pluralize(singular)
  const col = db[plural]
  const inputFields = schemaToFields(schema, true)
  const outputFields = schemaToFields(schema, false)
  const validate = (method, attrs) => {
    const schm = {
      create: saveSchema,
      read: schema,
      update: saveSchema,
      delete: schema
    }[method]
    const opts = {
      create: {},
      read: {},
      update: {},
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
    fields: outputFields
  })
  const Model = {
    type: ModelType,
    args: inputFields,
    resolve: (root, opts) => col.findOne(validate('read', opts))
  }
  // const Models = {
  //   type: new GraphQLList(ModelType),
  //   args: inputFields,
  //   resolve: (root, opts) =>
  //     col.find(validate('read', opts)).sort({ $natural: -1 })
  // }
  const ModelSave = {
    type: ModelType,
    args: inputFields,
    resolve: (root, opts) => col.save(validate('update', opts))
  }
  // const ModelDelete = {
  //   type: ModelType,
  //   args: inputFields,
  //   resolve: (root, opts) => col.remove(validate('delete', opts))
  // }
  queryFields[singular] = Model
  // queryFields[plural] = Models
  mutationFields[`update${capitalize(singular)}`] = ModelSave
  mutationFields[`create${capitalize(singular)}`] = ModelSave
  // mutationFields[`delete${capitalize(singular)}`] = ModelDelete
}

const query = (name, attrs) => {
  if (isArray(attrs)) {
    const [schema, resolve] = attrs
    queryFields[name] = {
      type: joiToGraphQLType(schema),
      resolve: () => resolve(db)
    }
  } else {
    console.log('Convert to schema', attrs)
  }
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

export { model, $, schema, query }
