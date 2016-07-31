import { array, string } from 'joi'
import joiql from 'joiql'
import { campaign, campaigns, saveCampaign } from './campaign'
import mongojs, { ObjectId } from 'promised-mongo'
import { forEach } from 'lodash'

const { MONGOHQ_URL } = process.env
const db = mongojs(MONGOHQ_URL)

const api = joiql({
  query: {
    campaign,
    campaigns,
    regions: array().items(string())
      .description('Returns all regions of all campaigns.'),
    channels: array().items(string())
      .description('Returns all channels of all campaigns.')
  },
  mutation: {
    saveCampaign: saveCampaign,
    deleteCampaign: campaign
  }
})

api.on('query mutation', async ({ req, res }) => {
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
api.on('mutation.saveCampaign', async ({ req, res }) => {
  res.saveCampaign = await db.campaigns.save(req.args)
})
api.on('mutation.deleteCampaign', async ({ req, res }) => {
  await db.campaigns.remove(req.args, { justOne: true })
})
api.on('query.regions', async ({ res }) => {
  res.regions = await db.campaigns.distinct('regions')
})
api.on('query.channels', async ({ res }) => {
  res.channels = await db.campaigns.distinct('channels')
})

export default api.schema
