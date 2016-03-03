import React from 'react'
import functional from 'react-functional'

let { div, button } = React.DOM

let render = (props) => (
  div({}, props.title,
    button({ onClick: () => props.lock.show() }, 'Sign up'))
)

export default (props) => React.createElement(functional({ render }), props)
