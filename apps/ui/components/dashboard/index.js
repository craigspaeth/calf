import header from './header'
import campaigns from '../campaigns'
import { view, dom } from 'view'

let { div } = dom

export default view((props) => {
  return div({},
    header({}),
    campaigns({ campaigns: props.tree.get('campaigns') }))
})
