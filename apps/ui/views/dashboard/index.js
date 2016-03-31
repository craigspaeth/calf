import header from '../layout/header'
import campaigns from '../campaigns'
import { view, dom } from 'view'

let { div } = dom

export default view(() => (
  div({},
    header({}),
    campaigns({}))
))
