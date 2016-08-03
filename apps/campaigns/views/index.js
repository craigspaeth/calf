import rcomp from 'rcomp'
import Empty from './empty'
import List from './list'
import Header from 'components/layout/header'
import { state } from '../controller'

const comp = rcomp()

const { div, list, empty, header } = comp.els({
  list: List,
  empty: Empty,
  header: Header
})

comp.render(() =>
  div(
    header({}),
    div(
      state.get('campaigns').length > 0
      ? list()
      : empty()))
)

export default comp()
