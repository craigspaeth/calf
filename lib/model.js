import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import { GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql'
import { GraphQLObjectType, GraphQLUnionType } from 'graphql'
import { GraphQLInputObjectType, GraphQLSchema, GraphQLList } from 'graphql'
import { mapValues, capitalize, isArray, uniqueId, map } from 'lodash'
import { fromPairs, find, assign } from 'lodash'
import mongojs, { ObjectId } from 'promised-mongo'
import pluralize from 'pluralize'

Joi.objectid = JoiObjectId(Joi)

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)
const $ = Joi
const queryFields = {}
const mutationFields = {}

const joiToGraphQLType = (schema, isInput = true) => {
  const objName = (
  (isInput ? 'Input' : '') +
  (map(schema._meta, 'name')[0] || 'Unknown') +
  uniqueId()
  )
  switch (schema._type) {
    case 'number':
      const isInteger = !!find(schema._tests, (t) => t.name === 'integer')
      return isInteger ? GraphQLInt : GraphQLFloat
    case 'date':
    case 'string':
      return GraphQLString
    case 'object':
      return new (isInput ? GraphQLInputObjectType : GraphQLObjectType)({
        name: objName,
        description: schema._description,
        fields: fromPairs(map(schema._inner.children, (child) => {
          return [child.key, { type: joiToGraphQLType(child.schema, isInput) }]
        })),
        isTypeOf: (val) => console.log(val)
      })
    case 'array':
      if (isInput) {
        let type
        if (schema._inner.items.length === 1) {
          type = joiToGraphQLType(schema._inner.items[0])
        } else {
          const fields = {}
          schema._inner.items.forEach((item) => {
            const itemFields = fromPairs(map(item._inner.children, (child) => {
              return [child.key, { type: joiToGraphQLType(child.schema) }]
            }))
            assign(fields, itemFields)
          })
          type = new GraphQLInputObjectType({
            name: objName,
            description: schema._description,
            fields: fields
          })
        }
        return new GraphQLList(type)
      } else {
        if (schema._inner.items.length === 1) {
          return joiToGraphQLType(schema._inner.items[0], false)
        } else {
          const unionName = map(schema._inner.items, (i) => {
            return map(i._meta, 'name')[0]
          }).join('Or') + uniqueId()
          return new GraphQLUnionType({
            name: unionName,
            description: schema._description,
            types: map(schema._inner.items, (i) => joiToGraphQLType(i, false))
          })
        }
      }
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
  const validate = (attrs) => {
    const { error: err, value: data } = Joi.validate(attrs, schema)
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
    fields: schemaToFields(schema)
  })
  // const Model = {
  //   type: ModelType,
  //   args: inputFields,
  //   resolve: (root, opts) => col.findOne(opts)
  // }
  const ModelSave = {
    type: ModelType,
    args: schemaToArgs(schema),
    resolve: (root, opts) => col.save(validate(opts))
  }
  mutationFields[`update${capitalize(singular)}`] = ModelSave
  mutationFields[`create${capitalize(singular)}`] = ModelSave
// const outputFields = schemaToFields(schema, false)
// const Models = {
//   type: new GraphQLList(ModelType),
//   args: inputFields,
//   resolve: (root, opts) =>
//     col.find(validate('read', opts)).sort({ $natural: -1 })
// }
// const ModelDelete = {
//   type: ModelType,
//   args: inputFields,
//   resolve: (root, opts) => col.remove(validate('delete', opts))
// }
// queryFields[singular] = Model
// queryFields[plural] = Models
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
