import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

let CampaignType = new GraphQLObjectType({
  name: 'Campaign',
  description: 'A campaign',
  fields: {
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
})

let Campaign = {
  type: CampaignType,
  args: {
    _id: {
      description: 'ID of campaign',
      type: GraphQLString
    }
  }
}

export default Campaign
