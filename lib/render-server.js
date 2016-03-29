import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'
import rewire from 'rewire'

export default ({ layout, views }) => async (ctx, next) => {
  let tree = ctx.tree = new Baobab()
  ctx.render = (body, props) => {
    let layoutComp = rewire(require.resolve(`${views}/${layout}`)).default
    let combinedProps
    if (body) {
      let bodyComp = rewire(require.resolve(`${views}/${body}`)).default
      combinedProps = Object.assign(
        ctx.state,
        props,
        { body: bodyComp, tree: tree }
      )
    } else {
      combinedProps = Object.assign(ctx.state, props, { tree: tree })
    }
    ctx.body = renderToString(layoutComp(combinedProps))
  }
  await next()
}
