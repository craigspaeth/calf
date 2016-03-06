import React from 'react'
import functional from 'react-functional'

let { div, button } = React.DOM
let PASSPORT_CALLBACK_PATH = process.env.PASSPORT_CALLBACK_PATH
let APP_URL = process.env.APP_URL

let onClick = (props) => {
  props.lock.show({
    callbackURL: APP_URL + PASSPORT_CALLBACK_PATH,
    responseType: 'code',
    authParams: { scope: 'openid profile' }
  })
}

let render = (props) => {
  if (props.user) {
    return (
      div({}, `Hello ${props.user.displayName}`)
    )
  } else {
    return (
      div({}, props.title,
        button({ onClick: onClick.bind(null, props) }, 'Sign up'))
    )
  }
}

export default (props) => React.createElement(functional({ render }), props)
