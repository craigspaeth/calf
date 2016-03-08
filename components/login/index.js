import React from 'react'
import functional from 'react-functional'

let { div } = React.DOM
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL

let componentDidMount = (props) => {
  console.log(props.lock)
  props.lock.show({
    callbackURL: APP_URL + PASSPORT_CALLBACK_PATH,
    responseType: 'code',
    authParams: { scope: 'openid profile' }
  })
}

let render = (props) => (
  div()
)

export default (props) => React.createElement(functional({ componentDidMount, render }), props)
