import { view, dom } from 'view'
import empty from './empty'
import list from './list'

let { div } = dom

export default view((props, { tree }) => {
  console.log(props, tree)
  return div({},
    tree.get('campaigns').length > 0 ? list({}) : empty({}))
})
