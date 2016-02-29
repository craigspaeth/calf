import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql'

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
})

let User = {
  type: UserType,
  args: {
    id: {
      description: 'ID of the user',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root) => ({ id: 'bar' })
}

export default User
