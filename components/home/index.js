import React from 'react'
import functional from 'react-functional'

let { div } = React.DOM

let render = (props) => (
  div({}, props.title)
)

export default (props) => React.createElement(functional({ render }), props)
