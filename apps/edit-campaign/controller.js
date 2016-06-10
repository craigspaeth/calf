import api from 'api'
import editCampaign from './views'
import { compact, map } from 'lodash'

const campaignAttrs = ['_id', 'name', 'startAt', 'endAt', 'channels', 'regions']

const maybeEnableNextStep = (tree) => {
  const campaign = tree.select('campaign')
  if (
    campaign.get('name') &&
    campaign.get('startAt') &&
    campaign.get('endAt')
  ) {
    tree.select('enableNextStep').set(true)
  }
}

const renderEdit = async (ctx) => {
  if (ctx.params.id) {
    const data = await api(`{
      regions
      channels
      campaign(_id: "${ctx.params.id}") { ${campaignAttrs.join(' ')} }
    }`)
    ctx.tree.set('regions', data.regions)
    ctx.tree.set('channels', data.channels)
    ctx.tree.set('campaign', data.campaign)
  }
  ctx.render(editCampaign)
  if (ctx.browser) {
    maybeEnableNextStep(ctx.tree)
    document.querySelector('.foobarbaz').focus()
  }
}

export const detailsRoute = async (ctx) => {
  ctx.tree.set('nextHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/adbuilder`)
  await renderEdit(ctx)
}

export const adbuilderRoute = async (ctx) => {
  ctx.tree.set('prevHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/details`)
  ctx.tree.set('nextHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const targetingRoute = async (ctx) => {
  ctx.tree.set('prevHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/adbuilder`)
  ctx.tree.set('nextHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const reviewRoute = async (ctx) => {
  ctx.tree.set('prevHref',
    `/campaigns/${ctx.tree.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const editRoute = (ctx, next) => {
  ctx.redirect(`/campaigns/${ctx.params.id}/edit/details`)
}

export const saveAndQuitCampaign = async (tree) => {
  const campaign = tree.get('campaign')
  const args = compact(map(campaign, (val, key) =>
    val ? `${key}: ${JSON.stringify(val)}` : null
  )).join(' ')
  const method = campaign && campaign._id ? 'updateCampaign' : 'createCampaign'
  await api(`mutation { ${method}(${args}) { _id } }`)
  window.location.assign('/')
}

export const del = async (tree) => {
  if (!window.confirm('Are you sure you want to delete this campaign?')) return
  await api(`
    mutation {
      deleteCampaign(_id: "${tree.get('campaign')._id}") { _id }
    }
  `)
  tree.set('campaign', {})
  window.location.assign('/')
}

export const updateAttr = (tree, attr, val) => {
  const campaign = tree.select('campaign')
  campaign.set(attr, val)
  maybeEnableNextStep(tree)
}
