import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'
import { assign } from 'lodash'

let pageComponent
const tree = window.tree = new Baobab(window.__TREE__)
const Component = React.createClass({
  childContextTypes: {
    tree: React.PropTypes.object
  },
  getChildContext () {
    return { tree }
  },
  componentDidMount () {
    tree.on('update', (e) => this.forceUpdate())
  },
  render () {
    return pageComponent({})
  }
})

export default () => async (ctx, next) => {
  ctx.tree = tree
  ctx.browser = true
  ctx.render = (component, props) => {
    const combinedProps = assign({}, ctx.state, props, { tree })
    pageComponent = component
    const comp = render(
      React.createElement(Component, combinedProps),
      document.getElementById('body')
    )
    window.scrollTo(0, 0)
    return comp
  }
  await next()
}
