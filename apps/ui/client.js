import Home from 'components/home'
import { render } from 'react-dom'
import Auth0Lock from 'auth0-lock'

let USER = window.__BOOTSTRAP__ && window.__BOOTSTRAP__.USER
let AUTH0_ID = process.env.AUTH0_ID
let AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
let lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN)

if (USER) {
  render(Home({ title: `Hello user ${USER.displayName}` }), document.body)
} else {
  render(Home({ title: 'Hi there. Plz log in...', lock }), document.body)
}
