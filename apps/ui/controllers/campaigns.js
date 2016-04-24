import api from 'api'
import campaigns from '../views/campaigns'
import editCampaign from '../views/edit-campaign'
import page from 'page'
import { compact, map } from 'lodash'

const totalSteps = 4
const campaignAttrs = ['_id', 'name', 'startAt', 'endAt', 'channels', 'regions']

export const indexRoute = async (ctx, next) => {
  const res = await api(`{ campaigns { ${campaignAttrs.join(' ')} } }`)
  const data = await res.json()
  ctx.tree.set('campaigns', data.data.campaigns)
  ctx.render(campaigns)
}

const renderEdit = (ctx) => {
  ctx.render(editCampaign)
  document.querySelector('.foobarbaz').focus()
}

export const newRoute = (ctx) => {
  renderEdit(ctx)
}

export const editRoute = async (ctx, next) => {
  console.log('focus')
  const res = await api(`query {
    regions
    channels
    campaign(_id: "${ctx.params.id}") { ${campaignAttrs.join(' ')} }
  }`)
  const { data } = await res.json()
  ctx.tree.set('regions', data.regions)
  ctx.tree.set('channels', data.channels)
  ctx.tree.set('editCampaign', data.campaign)
  renderEdit(ctx)
}

export const editCampaignNext = (step) => {
  const curStep = step.get()
  if (curStep !== 0) step.set(curStep - 1)
}

export const editCampaignPrev = (step) => {
  const curStep = step.get()
  if (curStep < totalSteps - 1) step.set(curStep + 1)
}

export const saveAndQuitCampaign = async (tree) => {
  const campaign = tree.get('editCampaign')
  await api(`
    mutation {
      ${campaign._id ? 'updateCampaign' : 'createCampaign'}(${
        compact(map(campaign, (val, key) =>
          val ? `${key}: ${JSON.stringify(val)}` : null
        )).join(' ')
      }) { _id }
    }
  `)
  tree.set('editCampaignStep', 0)
  tree.set('editCampaign', { campaigns: [] })
  page('/')
}

export const deleteCampaign = async (tree) => {
  if (!window.confirm('Are you sure you want to delete this campaign?')) return
  await api(`
    mutation {
      deleteCampaign(_id: "${tree.get('editCampaign')._id}") { _id }
    }
  `)
  tree.set('editCampaign', {})
  page('/')
}

export const updateAttr = (campaign, attr) => (event) => {
  if (!campaign.get()) campaign.set({})
  campaign.set(attr, event.target.value)
}
