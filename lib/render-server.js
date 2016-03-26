import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'
import rewire from 'rewire'

export default ({ layout, views }) => async (ctx, next) => {
  ctx.state.tree = new Baobab()
  ctx.render = (body, props) => {
    let layoutComp = rewire(require.resolve(`${views}/${layout}`)).default
    let bodyComp = rewire(require.resolve(`${views}/${body}`)).default
    let combinedProps = Object.assign(ctx.state, props, { body: bodyComp })
    ctx.body = renderToString(layoutComp(combinedProps))
  }
  await next()
}
