import rcomp from 'rcomp'
import head from './head'

const comp = rcomp()
const { html, body, script, div } = comp.els()

comp.render(({ body: inner, bundle }) => {
  return html({},
    head(),
    body({},
      div({ id: 'body' }, inner ? inner({}) : 'Blank'),
      script({ src: bundle })))
})

export default comp()
