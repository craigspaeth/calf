import { view, dom } from 'view'
import head from './head'

const { html, body, script, div } = dom

export default view(({ body: inner, bundle }) => {
  return html({},
    head(),
    body({},
      div({ id: 'body' }, inner ? inner({}) : 'Blank'),
      script({ src: bundle })))
})
