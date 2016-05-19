import * as controller from './controller'
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
  shared.get('/campaigns', controller.indexRoute)
  shared.get('/campaigns/new', (ctx) => ctx.redirect('/campaigns/new/details'))
  shared.get('/campaigns/new/details', controller.detailsRoute)
  shared.get('/campaigns/new/adbuilder', controller.adbuilderRoute)
  shared.get('/campaigns/new/targeting', controller.targetingRoute)
  shared.get('/campaigns/new/review', controller.reviewRoute)
  shared.get('/campaigns/:id/edit', controller.editRoute)
  shared.get('/campaigns/:id/edit/details', controller.detailsRoute)
  shared.get('/campaigns/:id/edit/adbuilder', controller.adbuilderRoute)
  shared.get('/campaigns/:id/edit/targeting', controller.targetingRoute)
  shared.get('/campaigns/:id/edit/review', controller.reviewRoute)
  return routes
}
