import { deepOcean, lato } from 'style'
import { dom, style as rstyle } from 'view'
import reset from './reset'

const { head, meta, style, link } = dom

const rules = {
  body: {
    color: deepOcean,
    fontFamily: lato
  }
}

export default (
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
      rstyle({ rules: rules }))
)
