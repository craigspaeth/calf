import React from 'react'
import Radium, { Style } from 'radium'
import { omit, assign } from 'lodash'

const dom = React.DOM
const style = (props) => React.createElement(Style, props)

const svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

let Component = React.createClass({
  propTypes: {
    render: React.PropTypes.func.isRequired
  },
  render () {
    return this.props.render(omit(this.props, 'render'))
  }
})
Component = Radium(Component)

const view = (render) => (props) =>
  React.createElement(Component, assign({}, props, { render }))

export { view, dom, svgfile, style }
