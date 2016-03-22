import React from 'react'
import functional from 'react-functional'
import Empty from './empty'
import List from './list'

let { div } = React.DOM

let render = (props) => (
  div({},
    props.campaigns.length > 0
    ? List({ campaigns: props.campaigns })
    : Empty({}))
)

export default (props) => React.createElement(functional({ render }), props)
