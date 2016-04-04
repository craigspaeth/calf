import * as campaigns from './controllers/campaigns'
import router from 'router'

export default () => {
  const r = router()
  r.shared.get('/', (ctx) => ctx.redirect('/campaigns'))
  r.shared.get('/campaigns', campaigns.indexRoute)
  r.shared.get('/campaigns/new', campaigns.newRoute)
  r.shared.get('/campaigns/:id/edit', campaigns.editRoute)
  return r
}
