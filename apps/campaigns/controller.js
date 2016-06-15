import api from 'api'
import campaigns from './views'

const campaignAttrs = ['_id', 'name', 'startAt', 'endAt', 'channels', 'regions']

export const indexRoute = async (ctx, next) => {
  const data = await api(`{ campaigns { ${campaignAttrs.join(' ')} } }`)
  ctx.tree.set('campaigns', data.campaigns)
  ctx.render(campaigns)
}
