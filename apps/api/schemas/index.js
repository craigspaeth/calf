import { array, string } from 'joi'
import joiql from 'joiql'
import { campaign, campaigns, campaignMutation } from './campaign'
import mongojs, { ObjectId } from 'promised-mongo'
import { forEach } from 'lodash'

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)

const api = joiql({
  query: {
    campaign: campaign,
    campaigns: campaigns,
    regions: array().items(string())
      .description('Returns all regions of all campaigns.'),
    channels: array().items(string())
      .description('Returns all channels of all campaigns.')
  },
  mutation: {
    campaign: campaignMutation
  }
})

api.on('query', async ({ req, res }) => {
  forEach(req, ({ fields, args }, resource) => {
    if (args._id) args._id = ObjectId(args._id)
  })
})
api.on('query.campaign', async ({ req, res }) => {
  res.campaign = await db.campaigns.findOne(req.args)
})
api.on('query.campaigns', async ({ req, res }) => {
  res.campaigns = await db.campaigns.find(req.args)
})
api.on('mutation.campaign', async ({ req, res }) => {
  console.log('saving!', req.args)
  res.campaign = await db.campaigns.save(req.args)
})
api.on('query.regions', async ({ res }) => {
  res.campaign = await db.campaigns.distinct('regions')
})
api.on('query.channels', async ({ res }) => {
  res.campaign = await db.campaigns.distinct('channels')
})

export default api.schema
