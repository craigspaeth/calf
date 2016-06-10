import api from 'api'
import editCampaign from './views'
import { compact, map } from 'lodash'

const campaignAttrs = ['_id', 'name', 'startAt', 'endAt', 'channels', 'regions']

const maybeEnableNextStep = (state) => {
  const campaign = state.select('campaign')
  if (
    campaign.get('name') &&
    campaign.get('startAt') &&
    campaign.get('endAt')
  ) {
    state.select('enableNextStep').set(true)
  }
}

const renderEdit = async (ctx) => {
  if (ctx.params.id) {
    const data = await api(`{
      regions
      channels
      campaign(_id: "${ctx.params.id}") { ${campaignAttrs.join(' ')} }
    }`)
    ctx.state.set('regions', data.regions)
    ctx.state.set('channels', data.channels)
    ctx.state.set('campaign', data.campaign)
    if (ctx.params.step) ctx.state.set('step', ctx.params.step)
  }
  ctx.render(editCampaign)
  if (ctx.browser) maybeEnableNextStep(ctx.state)
}

export const detailsRoute = async (ctx) => {
  ctx.state.set('nextHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/adbuilder`)
  await renderEdit(ctx)
  if (ctx.browser) document.querySelector('.foobarbaz').focus()
}

export const adbuilderRoute = async (ctx) => {
  ctx.state.set('prevHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/details`)
  ctx.state.set('nextHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const targetingRoute = async (ctx) => {
  ctx.state.set('prevHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/adbuilder`)
  ctx.state.set('nextHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const reviewRoute = async (ctx) => {
  ctx.state.set('prevHref',
    `/campaigns/${ctx.state.get('campaign')._id}/edit/targeting`)
  await renderEdit(ctx)
}

export const editRoute = (ctx, next) => {
  ctx.redirect(`/campaigns/${ctx.params.id}/edit/details`)
}

export const saveAndQuitCampaign = async (state) => {
  const campaign = state.get('campaign')
  const args = compact(map(campaign, (val, key) =>
    val ? `${key}: ${JSON.stringify(val)}` : null
  )).join(' ')
  const method = campaign && campaign._id ? 'updateCampaign' : 'createCampaign'
  await api(`mutation { ${method}(${args}) { _id } }`)
  window.location.assign('/')
}

export const del = async (state) => {
  if (!window.confirm('Are you sure you want to delete this campaign?')) return
  await api(`
    mutation {
      deleteCampaign(_id: "${state.get('campaign')._id}") { _id }
    }
  `)
  state.set('campaign', {})
  window.location.assign('/')
}

export const updateAttr = (state, attr, val) => {
  const campaign = state.select('campaign')
  campaign.set(attr, val)
  maybeEnableNextStep(state)
}
