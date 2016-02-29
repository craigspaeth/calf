import jwt from 'koa-jwt'
import convert from 'koa-convert'

let { JWT_SECRET, JWT_AUDIENCE } = process.env

export default async (ctx, next) => {
  if (ctx.headers.Authorization) {
    convert(jwt({
      secret: new Buffer(JWT_SECRET, 'base64'),
      audience: JWT_AUDIENCE
    })).apply(ctx, arguments)
  }
  await next()
}
