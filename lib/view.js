import React from 'react'
import Radium from 'radium'

const dom = React.DOM

const svgfile = (props) =>
  dom.span(Object.assign(props, {
    dangerouslySetInnerHTML: {
      __html: props.src.toString()
    }
  }))

const view = (render) => (props) => {
  render.contextTypes = { tree: React.PropTypes.object }
  return React.createElement(Radium(render), props)
}

export { view, dom, svgfile }
