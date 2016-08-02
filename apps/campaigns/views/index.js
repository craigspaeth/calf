import { view, dom } from 'view'
import empty from './empty'
import list from './list'
import header from 'components/layout/header'
import { state } from '../controller'

const { div } = dom

export default view(() => {
  return div({},
    header({}),
    div({},
      state().get('campaigns').length > 0
      ? list()
      : empty()))
})
