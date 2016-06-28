import router from 'router'
import render from 'render'
import layout from 'components/layout'
import initialState from 'components/edit-campaign/initial-state'
import { render as renderEdit } from 'components/edit-campaign/controller'
import view from './views'

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, initialState, bundle: '/adbuilder/client.js' }))
  shared.get('/campaigns/:id/edit/adbuilder', renderEdit(view, 1))
  shared.get('/campaigns/new/adbuilder', renderEdit(view, 1))
  return routes()
}
