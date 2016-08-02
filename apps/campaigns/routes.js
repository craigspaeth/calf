import * as controller from './controller'
import unikoa from 'unikoa'
import layout from 'components/layout'
import body from './views/index'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'

const router = unikoa()

router.get('/', (ctx) => ctx.redirect('/campaigns'))
router.get('/campaigns', controller.indexRoute)
router.use(async (ctx, next) => {
  if (typeof window === 'undefined') {
    const comp = layout({ body, bundle: '/edit-campaign/client.js' })
    ctx.body = renderToString(comp)
  } else {
    console.log('rendering client')
    render(body(), document.body)
  }
  next()
})

export default router
