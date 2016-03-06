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
    email: {
      description: 'Email address of the user',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, opts, { rootValue: user }) => user
}

export default User
