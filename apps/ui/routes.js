import * as campaigns from './controllers/campaigns'
import router from 'router'
import render from 'render'
import layout from './views/layout'
import state from './state'

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout: layout, state: state }))
  shared.get('/', (ctx) => ctx.redirect('/campaigns'))
  shared.get('/campaigns', campaigns.indexRoute)
  shared.get('/campaigns/new', campaigns.newRoute)
  shared.get('/campaigns/:id/edit', campaigns.editRoute)
  return routes
}
