import React from 'react'
import Baobab from 'baobab'
import { render } from 'react-dom'

let pageComponent
const state = window.state = new Baobab(window.__STATE__)
const Component = React.createClass({
  childContextTypes: {
    state: React.PropTypes.object
  },
  getChildContext () {
    return { state }
  },
  componentDidMount () {
    state.on('update', (e) => this.forceUpdate())
  },
  render () {
    return pageComponent({})
  }
})

export default () => async (ctx, next) => {
  ctx.state = state
  ctx.browser = true
  ctx.render = (component) => {
    pageComponent = component
    const comp = render(
      React.createElement(Component, { state }),
      document.getElementById('body')
    )
    window.scrollTo(0, 0)
    return comp
  }
  await next()
}
