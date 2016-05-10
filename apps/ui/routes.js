import * as campaigns from './controller'
import router from 'router'
import render from 'render'
import layout from './views/layout'

const state = {
  editCampaign: {
    channels: [],
    regions: []
  },
  campaigns: [],
  editCampaignStep: 1
}

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, state }))
  shared.get('/', (ctx) => ctx.redirect('/campaigns'))
  shared.get('/campaigns', campaigns.indexRoute)
  shared.get('/campaigns/new', campaigns.newRoute)
  shared.get('/campaigns/:id/edit', campaigns.editRoute)
  return routes
}
