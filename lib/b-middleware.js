import c from 'koa-convert'
import browserify from 'browserify-dev-middleware'
import babelify from 'babelify'
import envify from 'envify'
import brfs from 'brfs'

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
        transforms: [babelify, brfs, envify].concat(opts.transforms || [])
      })({ url: ctx.url }, { send }, next)
    })
    await next()
  })
}
