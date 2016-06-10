import koaRouter from 'koa-router'
import page from 'page'

export default () => {
  // Server
  if (typeof window === 'undefined') {
    const router = () => r.routes()
    const r = koaRouter()
    router.server = r
    router.client = { get: () => {}, use: () => {} }
    router.shared = {
      get: (...args) => r.get(...args),
      use: (...args) => r.use(...args)
    }
    return router

  // Client
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

    // Bridge some things from Koa
    page((ctx) => {
      ctx.url = window.location.pathname + window.location.search
    })
    return router
  }
}
