import {
  GraphQLList,
  GraphQLString
} from 'graphql'
import Campaign from './campaign'
import db from './db'

let Campaigns = {
  type: new GraphQLList(Campaign.type),
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

export default Campaigns
