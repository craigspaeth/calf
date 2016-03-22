import Koa from 'koa'
import browserify from 'koa-browserify-middleware'
import c from 'koa-convert'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import session from 'koa-generic-session'
import kpassport from 'koa-passport'
import bodyParser from 'koa-bodyparser'
import { get } from 'koa-route'
import Campaign from './models/campaign'

let { AUTH0_ID, AUTH0_SECRET, AUTH0_DOMAIN, SESSION_SECRET } = process.env
let { PASSPORT_CALLBACK_PATH } = process.env
let app = new Koa()

// Passport setup
let strategy = new Auth0Strategy({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_ID,
  clientSecret: AUTH0_SECRET,
  callbackURL: '/callback'
}, (a, r, extra, profile, done) =>
  done(null, Object.assign(profile, { jwtToken: extra.id_token })))
passport.use(strategy)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
app.keys = [SESSION_SECRET]
app.use(c(session({ cookie: { key: 'calf-session', signed: false } })))
app.use(bodyParser())
app.use(kpassport.initialize())
app.use(kpassport.session())
app.use(c(get(PASSPORT_CALLBACK_PATH, (ctx, next) => {
  return kpassport.authenticate('auth0', (user, info, status) => {
    ctx.login(user)
    next()
  })(ctx, next)
})))
app.use(c(get('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})))

// Browserify setup
app.use(c(get('/client.js', c(browserify(
  __dirname + '/client.js',
  { transform: ['babelify', 'brfs', 'envify'] }
)))))

// Render
app.use(async (ctx, next) => {
  ctx.state.bootstrap = {}
  if (!ctx.session.passport) return await next()
  ctx.state.bootstrap.USER = ctx.state.user = ctx.session.passport.user
  await next()
})
app.use(c(get('/login', async (ctx, next) => {
  ctx.render('layout', { body: 'login' })
})))
app.use(c(get('/callback', async (ctx, next) => {
  ctx.redirect('/')
})))
app.use(async (ctxt, next) => {
  ctxt.state.campaigns = ctxt.state.bootstrap.CAMPAIGNS = await Campaign.get()
  await next()
})
app.use(c(get('/', async (ctx, next) => {
  if (!ctx.state.user) return ctx.redirect('/login')
  ctx.render('layout', { body: 'dashboard' })
})))

// Error handler
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})

export default app
