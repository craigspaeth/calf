import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'

export default ({ layout, state }) => async (ctx, next) => {
  const tree = ctx.tree = new Baobab(state)
  ctx.render = (component, props) => {
    let combinedProps = Object.assign(
      ctx.state,
      props,
      { radiumConfig: { userAgent: ctx.headers['user-agent'] } }
    )
    if (component) {
      combinedProps = Object.assign(
        combinedProps,
        { body: component, tree: tree }
      )
    }
    ctx.body = renderToString(layout(combinedProps))
  }
  await next()
}
