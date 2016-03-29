import Baobab from 'baobab'
import { render } from 'react-dom'
import dashboard from '../apps/ui/views/dashboard'
import newCampaign from '../apps/ui/views/campaigns/new'

export default ({ views }) => async (ctx, next) => {
  let tree = ctx.tree = new Baobab(window.__TREE__)
  ctx.render = (view, props) => {
    let comp = {
      'dashboard': dashboard,
      'campaigns/new': newCampaign
    }[view]
    render(comp(Object.assign({ tree: tree }, ctx.state)), document.body)
  }
  await next()
}
