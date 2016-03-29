import Auth0Lock from 'auth0-lock'

let AUTH0_ID = process.env.AUTH0_ID
let AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL
let lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN)

lock.show({
  callbackURL: APP_URL + PASSPORT_CALLBACK_PATH,
  responseType: 'code',
  authParams: { scope: 'openid profile' }
})
