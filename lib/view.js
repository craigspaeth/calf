import React from 'react'
import Radium from 'radium'

let dom = React.DOM

let svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

let view = (render) => (props) => {
  render.contextTypes = { tree: React.PropTypes.object }
  return React.createElement(Radium(render), props)
}

export { view, dom, svgfile }
