import React from 'react'
import Radium from 'radium'
import { omit, assign } from 'lodash'

const dom = React.DOM

const svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

class Component extends React.Component {
  render() {
    return this.props.render(omit(this.props, 'render'))
  }
}
Component = Radium(Component)

const view = (render) => (props) =>
  React.createElement(Component, assign({}, props, { render }))

export { view, dom, svgfile }
