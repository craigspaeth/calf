import React from 'react'
import Radium, { Style } from 'radium'
import { omit, assign, uniqueId, flow } from 'lodash'

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

let Component = Radium(React.createClass({
  propTypes: {
    render: React.PropTypes.func.isRequired
  },
  contextTypes: {
    tree: React.PropTypes.object
  },
  render () {
    return this.props.render(omit(this.props, 'render'), this.context)
  }
}))

export const view = (render, opts = {}) => (props) =>
  React.createElement(
    opts.decorators ? flow(opts.decorators)(Component) : Component,
    assign({}, props, { render })
  )
