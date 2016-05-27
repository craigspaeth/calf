import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import {
  GraphQLString, GraphQLFloat, GraphQLInt, GraphQLObjectType,
  GraphQLInputObjectType, GraphQLSchema, GraphQLList
} from 'graphql'
import {
  mapValues, capitalize, isArray, uniqueId, map, fromPairs, find,
  assign
} from 'lodash'
import mongojs, { ObjectId } from 'promised-mongo'
import pluralize from 'pluralize'

Joi.objectid = JoiObjectId(Joi)

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)
const $ = Joi
const queryFields = {}
const mutationFields = {}
const joiTypes = {}

const joiToGraphQLType = (schema, isInput = true) => {
  let typeName = (
    (isInput ? 'Input' : '') +
    (map(schema._meta, 'name')[0] || 'WarningUnknownType' + uniqueId())
  )
  const ObjectType = isInput ? GraphQLInputObjectType : GraphQLObjectType
  switch (schema._type) {
    case 'number':
      const isInteger = !!find(schema._tests, (t) => t.name === 'integer')
      return isInteger ? GraphQLInt : GraphQLFloat
    case 'date':
    case 'string':
      return GraphQLString
    case 'object':
      if (joiTypes[typeName]) {
        return joiTypes[typeName]
      } else {
        const type = new ObjectType({
          name: typeName,
          description: schema._description,
          fields: fromPairs(map(schema._inner.children, (child) =>
            [child.key, { type: joiToGraphQLType(child.schema, isInput) }]
          ))
        })
        joiTypes[typeName] = type
        return type
      }
    case 'array':
      let type
      if (schema._inner.items.length === 1) {
        type = joiToGraphQLType(schema._inner.items[0], isInput)
      } else {
        const fields = {}
        typeName = map(schema._inner.items, (i) =>
          (isInput ? 'Input' : '') +
          (map(i._meta, 'name')[0] || 'WarningUnknownType' + uniqueId())
        ).join('And')
        if (joiTypes[typeName]) {
          type = joiTypes[typeName]
        } else {
          schema._inner.items.forEach((item) => {
            const itemFields = fromPairs(map(item._inner.children, (child) =>
              [child.key, { type: joiToGraphQLType(child.schema, isInput) }]
            ))
            assign(fields, itemFields)
          })
          type = new ObjectType({
            name: typeName,
            description: schema._description,
            fields: fields
          })
        }
      }
      if (!joiTypes[typeName]) joiTypes[typeName] = type
      return new GraphQLList(type)
  }
}

const schemaToArgs = (schema) => {
  return mapValues(schema, (schema, attr) => {
    return {
      description: schema._description,
      type: joiToGraphQLType(schema, true)
    }
  })
}

const schemaToFields = (schema) => {
  return mapValues(schema, (schema, attr) => {
    return {
      description: schema._description,
      type: joiToGraphQLType(schema, false)
    }
  })
}

const model = (name, { schema }) => {
  if (!schema._id) schema._id = $.objectid().description('Unique ID')
  const singular = name.toLowerCase()
  const plural = pluralize(singular)
  const col = db[plural]
  const typecast = (data) => {
    return mapValues(data, (val, attr) => {
      const test = schema[attr]._tests[0]
      const isObjectId = test && test.arg.toString() === '/^[0-9a-fA-F]{24}$/'
      return isObjectId ? ObjectId(val) : val
    })
  }
  const validate = (attrs) => {
    const { error: err, value: data } = Joi.validate(attrs, schema)
    if (err) throw new Error(err)
    return typecast(data)
  }
  const ModelType = new GraphQLObjectType({
    name: name,
    description: `${name} model`,
    fields: schemaToFields(schema)
  })
  const Model = {
    type: ModelType,
    args: schemaToArgs(schema),
    resolve: (root, opts) => col.findOne(typecast(opts))
  }
  const ModelSave = {
    type: ModelType,
    args: schemaToArgs(schema),
    resolve: (root, opts) => col.save(validate(opts))
  }
  const Models = {
    type: new GraphQLList(ModelType),
    args: schemaToArgs(schema),
    resolve: (root, opts) => col.find(typecast(opts)).sort({ $natural: -1 })
  }
  const ModelDelete = {
    type: ModelType,
    args: schemaToArgs(schema),
    resolve: (root, opts) => col.remove(typecast(opts))
  }
  mutationFields[`update${capitalize(singular)}`] = ModelSave
  mutationFields[`create${capitalize(singular)}`] = ModelSave
  queryFields[singular] = Model
  queryFields[plural] = Models
  mutationFields[`delete${capitalize(singular)}`] = ModelDelete
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
