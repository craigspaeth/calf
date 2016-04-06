import React from 'react'
// import Radium from 'radium'

const dom = React.DOM

const svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

const view = (render) => (props) =>
  React.createElement(render, props)

export { view, dom, svgfile }
