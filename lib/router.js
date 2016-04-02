import Koa from 'koa'
import mount from 'koa-mount'
import route from 'koa-route'
import convert from 'koa-convert'
import page from 'page'

export default () => {
  if (typeof window === 'undefined') {
    let app = new Koa()
    let server = {}
    ;['get', 'post', 'put', 'delete', 'all', 'use'].forEach((verb) => {
      server[verb] = (...args) => {
        app.use(convert(route.get(...args)))
      }
    })
    let router = mount(app)
    router.server = server
    router.client = { get: () => {}, use: () => {} }
    router.shared = { get: server.get, use: server.use }
    return router
  } else {
    let router = () => page()
    router.server = { get: () => {}, use: () => {} }
    router.client = {
      get: (...args) => page(...args),
      use: (...args) => page(...args)
    }
    router.client.use((ctx, next) => {
      ctx.redirect = page.redirect
      next()
    })
    router.shared = router.client
    return router
  }
}
