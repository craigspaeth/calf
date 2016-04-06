import Koa from 'koa'
import koaRouter from 'koa-router'
import page from 'page'

export default () => {
  if (typeof window === 'undefined') {
    const app = new Koa()
    const router = () => r.routes()
    const r = koaRouter()
    router.server = r
    router.client = { get: () => {}, use: () => {} }
    router.shared = {
      get: (...args) => r.get(...args),
      use: (...args) => app.use(...args)
    }
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
