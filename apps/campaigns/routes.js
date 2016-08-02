import * as controller from './controller'
import unikoa from 'unikoa'
import unikoaReactRender from 'unikoa-react-render'
import head from 'components/layout/head'
import body from './views/index'
import React from 'react'

const { script } = React.DOM
const router = unikoa()

router.get('/', (ctx) => ctx.redirect('/campaigns'))
router.get('/campaigns', controller.indexRoute)
router.use(unikoaReactRender({
  head: head,
  body: body(),
  scripts: [
    script({ src: '/campaigns/client.js' })
  ]
}))

export default router
