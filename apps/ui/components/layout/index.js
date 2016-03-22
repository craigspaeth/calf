import React from 'react'
import functional from 'react-functional'
import rewire from 'rewire'
import reset from './reset'

let { html, body, script, head, meta, style } = React.DOM

let render = (props) => {
  let path = require.resolve('../' + props.body)
  return html({},
    head({},
      meta({
        name: 'viewport',
        content: [
          'width=device-width',
          'initial-scale=1.0',
          'maximum-scale=1.0',
          'user-scalable=no'
        ].join(', ')
      }),
      style({ dangerouslySetInnerHTML: { __html: reset } })),
    body({}, rewire(path).default(props),
      script({ dangerouslySetInnerHTML: { __html: `
        var __BOOTSTRAP__ = ${JSON.stringify(props.bootstrap)};
      ` }}),
      script({ src: 'client.js' })))
}

export default (props) => React.createElement(functional({ render }), props)
