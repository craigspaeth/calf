import api from 'api'
import dashboard from '../views/dashboard'
import editCampaign from '../views/campaigns/edit'
import page from 'page'
import { compact, map } from 'lodash'

const totalSteps = 4
const campaignAttrs = ['_id', 'name', 'startAt', 'endAt']

export const indexRoute = async (ctx, next) => {
  const res = await api(`{ campaigns { ${campaignAttrs.join(' ')} } }`)
  const data = await res.json()
  ctx.tree.set('campaigns', data.data.campaigns)
  ctx.render(dashboard)
}

export const newRoute = (ctx) => {
  ctx.render(editCampaign)
}

export const editRoute = async (ctx, next) => {
  const res = await api(`query {
    campaign(_id: "${ctx.params.id}") { ${campaignAttrs.join(' ')} }
  }`)
  const data = await res.json()
  ctx.tree.set('editCampaign', data.data.campaign)
  ctx.render(editCampaign)
}

export const editCampaignNext = (step) => {
  const curStep = step.get() || 0
  if (curStep !== 0) step.set(curStep - 1)
}

export const editCampaignPrev = (step) => {
  const curStep = step.get() || 0
  if (curStep < totalSteps - 1) step.set(curStep + 1)
}

export const saveAndQuitCampaign = async (tree) => {
  await api(`
    mutation {
      createCampaign(${
        compact(map(tree.get('editCampaign'), (val, key) =>
          val ? `${key}: "${val}"` : null
        )).join(' ')
      }) { _id }
    }
  `)
  tree.set('editCampaign', {})
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
