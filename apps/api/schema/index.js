import User from './user'
import { Campaign, Campaigns, CampaignSave, CampaignDelete } from './campaign'
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
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      saveCampaign: CampaignSave,
      deleteCampaign: CampaignDelete
    }
  })
})

export default schema
