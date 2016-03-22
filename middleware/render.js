import { renderToString } from 'react-dom/server'
import rewire from 'rewire'

export default async (ctx, next) => {
  ctx.render = (name, props) => {
    let path = require.resolve('../apps/ui/components/' + name)
    let Component = rewire(path).default
    ctx.body = renderToString(Component(Object.assign({}, ctx.state, props)))
  }
  await next()
}
