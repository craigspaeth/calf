import { renderToString } from 'react-dom/server'
import rewire from 'rewire'

export default async (ctx, next) => {
  ctx.render = (path, props) => {
    let Component = rewire(require.resolve(path)).default
    ctx.body = renderToString(Component(Object.assign({}, ctx.state, props)))
  }
  await next()
}
