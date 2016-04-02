import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'
import { assign } from 'lodash'

let rendered = false
let tree = new Baobab(window.__TREE__)
let Component = React.createClass({
  propTypes: {
    tree: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    tree.on('update', (e) => this.forceUpdate())
  },
  render () {
    return tree.get('component')(this.props)
  }
})

export default () => async (ctx, next) => {
  ctx.tree = tree
  ctx.render = (component, props) => {
    tree.set('component', component)
    if (rendered) return
    rendered = true
    let combinedProps = assign({}, ctx.state, props, { tree })
    let rootComponent = React.createElement(Component, combinedProps)
    render(rootComponent, document.getElementById('layout'))
  }
  await next()
}
