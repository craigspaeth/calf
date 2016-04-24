import React from 'react'
import Radium, { Style } from 'radium'
import { omit, assign, uniqueId } from 'lodash'

export const dom = React.DOM

export const style = (props) =>
  React.createElement(Style, props)

export const svgfile = (props) => {
  const className = uniqueId('svgfile')
  return [
    props.style && style({
      key: 0,
      scopeSelector: '.' + className,
      rules: props.style
    }),
    dom.span(assign(props, {
      key: 1,
      className,
      dangerouslySetInnerHTML: { __html: props.src.toString() }
    }))
  ]
}

const Component = Radium(React.createClass({
  propTypes: {
    render: React.PropTypes.func.isRequired
  },
  render () {
    return this.props.render(omit(this.props, 'render'))
  }
}))

export const view = (render) => (props) => {
  return React.createElement(Component, assign({}, props, { render }))
}
