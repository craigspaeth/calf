import { view, dom } from 'view'
import empty from './empty'
import list from './list'
import header from 'components/layout/header'

const { div } = dom

export default view((_, { state }) => {
  return div({},
    header({}),
    div({},
      state.get('campaigns').length > 0
      ? list()
      : empty()))
})
