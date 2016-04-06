import { view, dom } from 'view'
import empty from './empty'
import list from './list'

const { div } = dom

export default view(({ campaigns }) => (
  div({}, campaigns.length > 0 ? list({ campaigns }) : empty({}))
))
