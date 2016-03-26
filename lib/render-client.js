import { render } from 'react-dom'
import dashboard from '../apps/ui/components/dashboard'
import newCampaign from '../apps/ui/components/campaigns/new'

export default ({ views }) => async (ctx, next) => {
  ctx.render = (view, props) => {
    // let comp = require(`${views}/${view}`)
    let comp = {
      'dashboard': dashboard,
      'campaigns/new': newCampaign
    }[view]
    render(comp(ctx.state), document.body)
  }
  await next()
}
