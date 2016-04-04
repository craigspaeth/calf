import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import { assign } from 'lodash'
import moment from 'moment'
import { ObjectId } from 'promised-mongo'
import db from './db'

const attrs = {
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
  },
  startAt: {
    description: 'Start at date in moment.js acceptable string form',
    type: GraphQLString,
    resolve: (str) => moment(str).toDate()
  },
  endAt: {
    description: 'End at date in moment.js acceptable string form',
    type: GraphQLString,
    resolve: (str) => moment(str).toDate()
  }
}

const toQuery = (opts) =>
  assign({}, opts, {
    _id: ObjectId(opts._id)
  })

export const CampaignType = new GraphQLObjectType({
  name: 'Campaign',
  description: 'A campaign',
  fields: attrs
})

export const Campaign = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => {
    return await db.campaigns.findOne(toQuery(opts))
  }
}

export const Campaigns = {
  type: new GraphQLList(CampaignType),
  description: 'A list of ad campaigns',
  args: {
    userId: {
      type: GraphQLString
    }
  },
  resolve: async (root, { userId }) => {
    return await db.campaigns.find()
  }
}

export const CampaignSave = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => {
    const data = {
      name: opts.name,
      userId: opts.userId
    }
    if (opts._id) data._id = ObjectId(opts._id)
    return await db.campaigns.save(data)
  }
}

export const CampaignDelete = {
  type: CampaignType,
  args: attrs,
  resolve: async (root, opts) => {
    return await db.campaigns.remove(toQuery(opts))
  }
}
