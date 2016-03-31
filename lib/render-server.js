import React from 'react'
import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'

export default ({ layout }) => async (ctx, next) => {
  let tree = ctx.tree = new Baobab()
  ctx.render = (component, props) => {
    console.log(component)
    component.childContextTypes = { tree: React.PropTypes.object.isRequired }
    let combinedProps
    if (component) {
      combinedProps = Object.assign(
        ctx.state,
        props,
        { body: component }
      )
    } else {
      combinedProps = Object.assign(ctx.state, props)
    }
    ctx.body = renderToString(layout(combinedProps))
  }
  await next()
}
