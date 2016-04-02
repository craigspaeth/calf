import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'

let Component = React.createClass({
  getInitialState() {
    return { tree: this.props.tree }
  },
  componentDidMount() {
    this.props.tree.on('update', (e) => this.forceUpdate())
  },
  render() {
    return this.props.component(this.props)
  }
})

export default () => async (ctx, next) => {
  let tree = ctx.tree = new Baobab(window.__TREE__)
  ctx.render = (component, props) => {
    render(React.createElement(
      Component,
      Object.assign(ctx.state, props, { tree, component })
    ), document.getElementById('layout'))
  }
  await next()
}
