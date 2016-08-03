import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'

const { html, head, body, div, script } = React.DOM
const ID = 'unikoa-react-render-body'

export default ({ head: _head, body: _body, scripts, subscribe }) =>
  async (ctx, next) => {
    // On the server compose the head, body, and scripts into a full page
    if (typeof window === 'undefined') {
      ctx.body = renderToString(
        html({},
          head({}, _head),
          body({},
            div({ id: ID }, _body()),
          typeof scripts[0] === 'string'
            ? scripts.map((src) => script({ src }))
            : scripts))
      )

    // On the client render just the body inside the server-rendered part
    } else {
      const Component = React.createClass({
        componentDidMount () {
          if (subscribe) subscribe(() => this.forceUpdate())
        },
        render () {
          return _body()
        }
      })
      render(React.createElement(Component, {}), document.getElementById(ID))
    }
    next()
  }
