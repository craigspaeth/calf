import * as controller from './controller'
import unikoa from 'unikoa'
import unikoaReactRender from 'unikoa-react-render'
import unikoaBootstrap from 'unikoa-bootstrap'
import head from 'components/layout/head'
import body from './views/index'

const router = unikoa()

router.use(unikoaBootstrap)
router.get('/', (ctx) => ctx.redirect('/campaigns'))
router.get('/campaigns', controller.indexRoute)
router.use(unikoaReactRender({
  head: head,
  body: body(),
  scripts: ['/campaigns/client.js']
}))

export default router
