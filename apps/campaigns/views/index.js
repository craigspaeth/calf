import veact from 'veact'
import Empty from './empty'
import List from './list'
import Header from 'components/layout/header'
import { state } from '../controller'

const view = veact()

const { div, list, empty, header } = view.els({
  list: List,
  empty: Empty,
  header: Header
})

view.render(() =>
  div(
    header({}),
    div(
      state.get('campaigns').length > 0
      ? list()
      : empty()))
)

export default view()
