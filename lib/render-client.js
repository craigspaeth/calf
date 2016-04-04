import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'
import { assign } from 'lodash'

let rendered = false
let pageComponent
const tree = new Baobab(window.__TREE__)
const Component = React.createClass({
  propTypes: {
    tree: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    tree.on('update', (e) => this.forceUpdate())
  },
  render () {
    return pageComponent
  }
})

export default () => async (ctx, next) => {
  ctx.tree = tree
  ctx.render = (component, props) => {
    const combinedProps = assign({}, ctx.state, props, { tree })
    pageComponent = component(combinedProps)
    tree.set('render', Math.random())
    if (rendered) return
    rendered = true
    render(
      React.createElement(Component, combinedProps),
      document.getElementById('layout')
    )
  }
  await next()
}
