import c from 'koa-convert'
import browserify from 'browserify-dev-middleware'
import babelify from 'babelify'
import envify from 'envify'
import brfsBabel from 'brfs-babel'

export default (opts) => {
  return c(async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const next = (err) => {
        if (err) reject(err)
        else resolve()
      }
      const send = (body) => {
        ctx.body = body
        resolve()
      }
      browserify({
        src: opts.src,
        transforms: [brfsBabel, babelify, envify].concat(opts.transforms || [])
      })({ url: ctx.url }, { send }, next)
    })
    await next()
  })
}
