import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'

const { html, head, body, div } = React.DOM
const ID = 'unikoa-react-render-body'

export default ({ head: _head, body: _body, scripts }) =>
  async (ctx, next) => {
    // On the server compose the head, body, and scripts into a full page
    if (typeof window === 'undefined') {
      ctx.body = renderToString(
        html({},
          head({}, _head),
          body({},
            div({ id: ID }, _body),
          scripts))
      )

    // On the client render just the body inside the server-rendered part
    } else render(_body, document.getElementById(ID))
    next()
  }
