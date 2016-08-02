import * as controller from './controller'
import { render as renderEdit } from 'components/edit-campaign/controller'
import unikoa from 'unikoa'
import unikoaReactRender from 'unikoa-react-render'
import unikoaBootstrap from 'unikoa-bootstrap'
import head from 'components/layout/head'
import body from './views/index'

const router = unikoa()

router.use(unikoaBootstrap)
router.get('/campaigns/:id/edit', controller.redirect)
router.get('/campaigns/:id/edit/details', renderEdit(controller.state, 0))
router.get('/campaigns/:id/edit/targeting', renderEdit(controller.state, 2))
router.get('/campaigns/:id/edit/review', renderEdit(controller.state, 3))
router.get('/campaigns/new', controller.redirect)
router.get('/campaigns/:id/edit/details', renderEdit(controller.state, 0))
router.get('/campaigns/new/targeting', renderEdit(controller.state, 2))
router.get('/campaigns/new/review', renderEdit(controller.state, 3))
router.use(unikoaReactRender({
  head: head,
  body: body(),
  scripts: ['/edit-campaign/client.js']
}))

export default router
