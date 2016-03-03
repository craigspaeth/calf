import React from 'react'
import functional from 'react-functional'
import Home from 'components/home'

let { html, body, script, head, meta } = React.DOM

let render = (props) => (
  html({},
    head({},
      meta({
        name: 'viewport',
        content: [
          'width=device-width',
          'initial-scale=1.0',
          'maximum-scale=1.0',
          'user-scalable=no'
        ].join(', ')
      })),
    body({}, Home(props),
      script({ src: 'client.js' })))
)

export default (props) => React.createElement(functional({ render }), props)
