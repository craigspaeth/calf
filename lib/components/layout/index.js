import { view, dom, style as rstyle } from 'view'
import { deepOcean, lato } from 'style'
import reset from './reset'

const { html, body, script, head, meta, style, div, link } = dom
const rules = {
  body: {
    color: deepOcean,
    fontFamily: lato
  }
}

export default view(({ body: inner }, { tree }) => {
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
      link({
        href: (
          'https://fonts.googleapis.com/css' +
          '?family=Montserrat:400,700|Lato:400,700,400italic'
        ),
        rel: 'stylesheet',
        type: 'text/css'
      }),
      style({ dangerouslySetInnerHTML: { __html: reset } }),
      rstyle({ rules: rules })),
    body({},
      div({ id: 'body' }, inner ? inner({}) : 'Blank'),
      script({ dangerouslySetInnerHTML: { __html: `
        var __TREE__ = ${JSON.stringify(tree)};
      ` }}),
      script({ src: '/client.js' })))
})
