import React from 'react'
import functional from 'react-functional'
import Header from './header'

let { div } = React.DOM
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL

let render = (props) => (
  Header({},
    div({}, 'Welcome to AdRhino'))
)

export default (props) => React.createElement(functional({ render }), props)
