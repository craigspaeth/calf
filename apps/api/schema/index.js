import User from './user'
import Campaign from './campaign'
import Campaigns from './campaigns'
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: User,
      campaign: Campaign,
      campaigns: Campaigns
    }
  })
})

export default schema
