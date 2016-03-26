import jwt from 'koa-jwt'
import convert from 'koa-convert'

let { AUTH0_SECRET, AUTH0_ID } = process.env

export default async (ctx, next) => {
  if (ctx.headers.Authorization) {
    convert(jwt({
      secret: new Buffer(AUTH0_SECRET, 'base64'),
      audience: AUTH0_ID
    })).apply(ctx, arguments)
  }
  await next()
}
