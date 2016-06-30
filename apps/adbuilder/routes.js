import router from 'router'
import render from 'render'
import layout from 'components/layout'
import editCampaignState from 'components/edit-campaign/initial-state'
import { render as renderEdit } from 'components/edit-campaign/controller'
import view from './views'
import { assign } from 'lodash'

const initialState = assign({
  editor: {
    x: 100,
    y: 100,
    type: 'color',
    hidden: false
  }
}, editCampaignState)

export default () => {
  const routes = router()
  const { shared } = routes
  shared.use(render({ layout, initialState, bundle: '/adbuilder/client.js' }))
  shared.get('/campaigns/:id/edit/adbuilder', renderEdit(view, 1))
  shared.get('/campaigns/new/adbuilder', renderEdit(view, 1))
  return routes()
}
