// import api from 'api'
// import editCampaign from './views'

export const redirect = (ctx, next) => {
  ctx.redirect(`/campaigns/${ctx.params.id}/edit/details`)
}

export const updateAttr = (tree, attr, val) => {
  const campaign = tree.select('campaign')
  campaign.set(attr, val)
  // maybeEnableNextStep(tree)
}
