import _debug from 'debug'

const debug = _debug('app')

export default async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    debug(err)
    ctx.status = err.status || 500
    ctx.body = err.stack
  }
}
