import { view, dom } from 'view'
import empty from './empty'
import list from './list'
import header from '../layout/header'

const { div } = dom

export default view((_, { tree }) => {
  return div({},
    header({}),
    div({},
      tree.get('campaigns').length > 0
      ? list()
      : empty()))
})
