import koaRouter from 'koa-router'
import page from 'page'

export default () => {
  // Server-side, just return an instance of Koa Router
  if (typeof window === 'undefined') return koaRouter()

  // Client-side, proxy Koa + Koa Rotuer functionality using Page.js
  const router = {
    get: (...args) => page(...args),
    use: (...args) => page(...args),
    routes: () => {
      console.log('paging..')
      page()
    }
  }

  // Bridge some things from Koa
  page((ctx, next) => {
    ctx.redirect = page.redirect
    ctx.url = window.location.pathname + window.location.search
    next()
  })
  return router
}
