import veact from 'veact'
import head from './head'

const view = veact()
const { html, body, script, div } = view.els()

view.render(({ body: inner, bundle }) => {
  return html({},
    head(),
    body({},
      div({ id: 'body' }, inner ? inner({}) : 'Blank'),
      script({ src: bundle })))
})

export default view()
