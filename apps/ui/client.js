import Dashboard from './components/dashboard'
import Login from './components/login'
import { render } from 'react-dom'
import Auth0Lock from 'auth0-lock'
// import api from './api'

let USER = window.__BOOTSTRAP__ && window.__BOOTSTRAP__.USER
let CAMPAIGNS = window.__BOOTSTRAP__ && window.__BOOTSTRAP__.CAMPAIGNS
let AUTH0_ID = process.env.AUTH0_ID
let AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
let lock = new Auth0Lock(AUTH0_ID, AUTH0_DOMAIN)

// TODO: React Router or better
if (window.location.pathname === '/login' && !USER) {
  render(Login({ lock }), document.body)
} else if (window.location.pathname === '/') {
  render(Dashboard({
    title: 'Hi there. Plz log in...',
    lock: lock,
    campaigns: CAMPAIGNS
  }), document.body)
}
