import componext from 'componext'
import Empty from './empty'
import List from './list'
import { state } from '../controller'

const { div, list, empty } = componext.els({ list: List, empty: Empty })

export default () =>
  div(
    // header({}),
    div(
      state.get('campaigns').length > 0
      ? list()
      : empty()))
