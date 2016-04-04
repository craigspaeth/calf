import header from '../layout/header'
import campaigns from '../campaigns'
import { view, dom } from 'view'

const { div } = dom

export default view((props) => (
  div({},
    header({}),
    campaigns({ campaigns: props.tree.get('campaigns') }))
))
