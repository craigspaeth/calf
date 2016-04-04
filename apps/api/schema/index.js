import User from './user'
import { Campaign, Campaigns, CampaignSave, CampaignDelete } from './campaign'
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

const schema = new GraphQLSchema({
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
      createCampaign: CampaignSave,
      updateCampaign: CampaignSave,
      deleteCampaign: CampaignDelete
    }
  })
})

export default schema
