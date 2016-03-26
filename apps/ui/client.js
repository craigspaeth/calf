import Baobab from 'baobab'
import Auth0Lock from 'auth0-lock'
import page from 'page'
import render from 'render-client'
import * as campaigns from './components/campaigns/controller'

let AUTH0_ID = process.env.AUTH0_ID
let AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL
let lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN)

page(render({ views: __dirname + '/components' }))
page((ctx, next) => {
  ctx.state.tree = new Baobab(window.__TREE__)
  next()
})
page('/login', () => {
  lock.show({
    callbackURL: APP_URL + PASSPORT_CALLBACK_PATH,
    responseType: 'code',
    authParams: { scope: 'openid profile' }
  })
})
page('/campaigns', campaigns.indexRoute)
page('/new', campaigns.newRoute)
page()
