import tree from 'universal-tree'
import { maybeEnableNextStep } from 'components/edit-campaign/controller'
import editCampaignState from 'components/edit-campaign/initial-state'

export const state = tree(editCampaignState)

export const redirect = (ctx, next) => {
  if (ctx.params.id) ctx.redirect(`/campaigns/${ctx.params.id}/edit/details`)
  else ctx.redirect('/campaigns/new/details')
}

export const updateAttr = (attr, val) => {
  const campaign = state.select('campaign')
  campaign.set(attr, val)
  maybeEnableNextStep(state)
}
