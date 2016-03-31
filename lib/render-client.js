import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'

export default () => async (ctx, next) => {
  let tree = ctx.tree = new Baobab(window.__TREE__)
  ctx.render = (component, props) => {
    component.childContextTypes = { tree: React.PropTypes.object.isRequired }
    let comp = component(Object.assign(ctx.state, props))
    render(comp, document.getElementById('layout'))
  }
  await next()
}
