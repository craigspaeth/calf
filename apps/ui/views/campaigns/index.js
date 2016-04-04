import { view, dom } from 'view'
import empty from './empty'
import list from './list'

const { div } = dom

export default view((props) => (
  div({},
    props.campaigns.length > 0
    ? list({ campaigns: props.campaigns })
    : empty({}))
))
