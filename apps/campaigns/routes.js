import * as controller from './controller'
import router from 'router'
import render from 'render'
import layout from 'components/layout'

const initialState = { campaigns: [] }

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, initialState, bundle: '/campaigns/client.js' }))
  shared.get('/', (ctx) => ctx.redirect('/campaigns'))
  shared.get('/campaigns', controller.indexRoute)
  return routes()
}
