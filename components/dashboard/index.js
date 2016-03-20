import React from 'react'
import functional from 'react-functional'
import Header from './header'
import Home from './home'

let { div } = React.DOM

let render = (props) => (
  div({},
    Header({}),
    Home({}))
)

export default (props) => React.createElement(functional({ render }), props)
