import React from 'react'
import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'

const Component = React.createClass({
  propTypes: {
    props: React.PropTypes.object.isRequired,
    layout: React.PropTypes.func.isRequired,
    tree: React.PropTypes.object.isRequired
  },
  childContextTypes: {
    tree: React.PropTypes.object
  },
  getChildContext () {
    return { tree: this.props.tree }
  },
  render () {
    return this.props.layout(this.props.props)
  }
})

export default ({ layout, initialState, bundle }) => async (ctx, next) => {
  const tree = ctx.tree = new Baobab(initialState)
  ctx.browser = false
  ctx.render = (body) => {
    const props = {
      radiumConfig: { userAgent: ctx.headers['user-agent'] },
      body,
      bundle
    }
    ctx.body = renderToString(
      React.createElement(Component, { layout, props, tree })
    )
  }
  await next()
}
