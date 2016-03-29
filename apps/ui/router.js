import * as campaigns from './controllers/campaigns'
import router from 'router'

export default () => {
  let r = router()
  r.shared.get('/campaigns', campaigns.indexRoute)
  r.shared.get('/campaigns/new', campaigns.newRoute)
  return r
}
