import { view, dom } from 'view'
import empty from './empty'
import list from './list'
import header from '../layout/header'

const { div } = dom

export default view(({ tree }) => (
  div({},
    header({}),
    div({},
      tree.get('campaigns').length > 0
      ? list({ campaigns: tree.get('campaigns') })
      : empty({})))
))
