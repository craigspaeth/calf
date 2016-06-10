import React from 'react'
import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'

const Component = React.createClass({
  propTypes: {
    props: React.PropTypes.object.isRequired,
    layout: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
  },
  childContextTypes: {
    state: React.PropTypes.object
  },
  getChildContext () {
    return { state: this.props.state }
  },
  render () {
    return this.props.layout(this.props.props)
  }
})

export default ({ layout, state: initial, bundle }) => async (ctx, next) => {
  const state = ctx.state = new Baobab(initial)
  ctx.browser = false
  ctx.render = (body) => {
    const props = {
      radiumConfig: { userAgent: ctx.headers['user-agent'] },
      body,
      bundle
    }
    ctx.body = renderToString(
      React.createElement(Component, { layout, props, state })
    )
  }
  await next()
}
