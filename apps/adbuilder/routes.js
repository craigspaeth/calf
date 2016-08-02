import * as controller from './controller'
import { render as renderEdit } from 'components/edit-campaign/controller'
import unikoa from 'unikoa'
import unikoaReactRender from 'unikoa-react-render'
import unikoaBootstrap from 'unikoa-bootstrap'
import head from 'components/layout/head'
import body from './views/index'

const router = unikoa()

router.use(unikoaBootstrap)
router.get('/campaigns/:id/edit/adbuilder', renderEdit(controller.state, 1))
router.get('/campaigns/new/adbuilder', renderEdit(controller.state, 1))
router.use(unikoaReactRender({
  head: head,
  body: body,
  scripts: ['/adbuilder/client.js'],
  subscribe: (cb) => controller.state.on('update', cb)
}))

export default router
