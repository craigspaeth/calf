import React from 'react'
import functional from 'react-functional'
import Header from './header'
import Campaigns from '../campaigns'

let { div } = React.DOM

let render = (props) => (
  div({},
    Header({}),
    Campaigns({ campaigns: props.campaigns }))
)

export default (props) => React.createElement(functional({ render }), props)
