import React from 'react'
import { Style } from 'radium'
import { assign, uniqueId } from 'lodash'

export const style = (props) =>
  React.createElement(Style, props)

export default (props) => {
  const className = uniqueId('svgfile')
  return React.DOM.span([
    props.style && style({
      key: 0,
      scopeSelector: '.' + className,
      rules: props.style
    }),
    React.DOM.span(assign(props, {
      key: 1,
      className,
      dangerouslySetInnerHTML: { __html: props.src.toString() }
    }))
  ])
}
