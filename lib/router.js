import Koa from 'koa'
import mount from 'koa-mount'
import route from 'koa-route'
import convert from 'koa-convert'
import page from 'page'

export default () => {
  if (typeof window === 'undefined') {
    const app = new Koa()
    const server = {}
    ;['get', 'post', 'put', 'delete', 'all', 'use'].forEach((verb) => {
      server[verb] = (...args) => {
        app.use(convert(route.get(...args)))
      }
    })
    const router = mount(app)
    router.server = server
    router.client = { get: () => {}, use: () => {} }
    router.shared = { get: server.get, use: server.use }
    return router
  } else {
    const router = () => page()
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
