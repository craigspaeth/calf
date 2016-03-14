import React from 'react'
import functional from 'react-functional'
import Header from './header'

let { div } = React.DOM

let render = (props) => (
  Header({},
    div({}, 'Welcome to AdRhino'))
)

export default (props) => React.createElement(functional({ render }), props)
