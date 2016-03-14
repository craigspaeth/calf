import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import { ObjectId } from 'promised-mongo'
import db from './db'

let attrs = {
  _id: {
    description: 'ID of campaign',
    type: GraphQLString
  },
  name: {
    description: 'Name of campaign',
    type: GraphQLString
  },
  userId: {
    description: 'ID of user associated to campaign',
    type: GraphQLString
  }
}

export let CampaignType = new GraphQLObjectType({
  name: 'Campaign',
  description: 'A campaign',
  fields: attrs
})

export let Campaign = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => await db.campaigns.findOne(opts)
}

export let Campaigns = {
  type: new GraphQLList(CampaignType),
  description: 'A list of ad campaigns',
  args: {
    userId: {
      type: GraphQLString
    }
  },
  resolve: async (root, { userId }) => {
    if (!userId) return []
    let campaigns = await db.campaigns.find()
    return campaigns
  }
}

export let CampaignSave = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => {
    let data = {
      name: opts.name,
      userId: opts.userId
    }
    if (opts._id) data._id = ObjectId(opts._id)
    return await db.campaigns.save(data)
  }
}

export let CampaignDelete = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => {
    return await db.campaigns.remove(opts)
  }
}
