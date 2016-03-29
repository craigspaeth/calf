import React from 'react'
import functional from 'react-functional'
import Radium from 'radium'

let dom = React.DOM

let svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

let view = (render) => (props) =>
  React.createElement(functional({ render: Radium(render) }), props)

export { view, dom, svgfile }
