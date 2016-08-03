import componext from 'componext'
import Empty from './empty'
import List from './list'
import { state } from '../controller'

const comp = componext()
const { div, list, empty } = comp.els({ list: List, empty: Empty })

comp.render(() =>
  div(
    // header({}),
    div(
      state.get('campaigns').length > 0
      ? list()
      : empty()))
)

export default comp()
