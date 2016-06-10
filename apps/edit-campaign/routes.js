import * as controller from './controller'
import router from 'router'
import render from 'render'
import layout from 'components/layout'

const state = {
  campaign: {
    channels: [],
    regions: []
  },
  step: 'details'
}

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, state, bundle: '/edit-campaign/client.js' }))
  shared.get('/campaigns/:id/edit/:step', (ctx, next) => next())
  shared.get('/campaigns/:id/edit', controller.editRoute)
  shared.get('/campaigns/:id/edit/details', controller.detailsRoute)
  shared.get('/campaigns/:id/edit/adbuilder', controller.adbuilderRoute)
  shared.get('/campaigns/:id/edit/targeting', controller.targetingRoute)
  shared.get('/campaigns/:id/edit/review', controller.reviewRoute)
  shared.get('/campaigns/new', (ctx) => ctx.redirect('/campaigns/new/details'))
  shared.get('/campaigns/new/details', controller.detailsRoute)
  shared.get('/campaigns/new/adbuilder', controller.adbuilderRoute)
  shared.get('/campaigns/new/targeting', controller.targetingRoute)
  shared.get('/campaigns/new/review', controller.reviewRoute)
  return routes()
}
