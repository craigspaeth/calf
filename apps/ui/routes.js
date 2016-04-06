import * as campaigns from './controllers/campaigns'
import router from 'router'

export default () => {
  const routes = router()
  const { shared } = routes
  shared.get('/', (ctx) => ctx.redirect('/campaigns'))
  shared.get('/campaigns', campaigns.indexRoute)
  shared.get('/campaigns/new', campaigns.newRoute)
  shared.get('/campaigns/:id/edit', campaigns.editRoute)
  return routes
}
