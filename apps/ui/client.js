import page from 'page'
import render from 'render-client'
import router from './router'

page(render({ views: __dirname + '/components' }))
router()()
