import Home from 'components/home'
import { render } from 'react-dom'
import Auth0Lock from 'auth0-lock'

let AUTH0_ID = process.env.AUTH0_ID
let AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
let lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN)
let authHash = lock.parseHash(window.location.hash)
let token

if (authHash && authHash.error) window.alert('Error logging in!')
else if (authHash) token = authHash.id_token

if (token) {
  // Send access token to api app which uses it to fetch Auth0 data and
  // then render the component with the user name.
  render(Home({ title: 'Hello user' }), document.body)
} else {
  render(Home({ title: 'Hi there. Plz log in...', lock }), document.body)
}
