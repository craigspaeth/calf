import * as controller from './controller'
import router from 'router'
import render from 'render'
import layout from 'components/layout'
import view from './views'
import { render as renderEdit } from 'components/edit-campaign/controller'
import initialState from 'components/edit-campaign/initial-state'

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, initialState, bundle: '/edit-campaign/client.js' }))
  shared.get('/campaigns/:id/edit/:step', (ctx, next) => next())
  shared.get('/campaigns/:id/edit', controller.redirect)
  shared.get('/campaigns/:id/edit/details', renderEdit(view, 0))
  shared.get('/campaigns/:id/edit/targeting', renderEdit(view, 2))
  shared.get('/campaigns/:id/edit/review', renderEdit(view, 3))
  shared.get('/campaigns/new', (ctx) => ctx.redirect('/campaigns/new/details'))
  shared.get('/campaigns/new/details', renderEdit(view, 0))
  shared.get('/campaigns/new/targeting', renderEdit(view, 2))
  shared.get('/campaigns/new/review', renderEdit(view, 3))
  return routes()
}
