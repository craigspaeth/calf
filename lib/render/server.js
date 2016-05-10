import React from 'react'
import Baobab from 'baobab'
import { renderToString } from 'react-dom/server'
import { assign } from 'lodash'

const Component = React.createClass({
  propTypes: {
    tree: React.PropTypes.object.isRequired,
    props: React.PropTypes.object.isRequired,
    child: React.PropTypes.object.isRequired
  },
  childContextTypes: {
    tree: React.PropTypes.object
  },
  getChildContext () {
    return { tree: this.props.tree }
  },
  render () {
    console.log(this.props.child, this.props.props)
    return this.props.child(this.props.props)
  }
})

export default ({ layout, state }) => async (ctx, next) => {
  const tree = ctx.tree = new Baobab(state)
  ctx.browser = false
  ctx.render = (component, props) => {
    let combinedProps = assign(
      props,
      { radiumConfig: { userAgent: ctx.headers['user-agent'] } },
      { body: component }
    )
    ctx.body = renderToString(React.createElement(Component, {
      child: layout,
      props: combinedProps,
      tree
    }))
  }
  await next()
}
