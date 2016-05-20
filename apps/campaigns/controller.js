import api from 'api'
import campaigns from './views'

const campaignAttrs = ['_id', 'name', 'startAt', 'endAt', 'channels', 'regions']

export const indexRoute = async (ctx, next) => {
  const res = await api(`{ campaigns { ${campaignAttrs.join(' ')} } }`)
  const data = await res.json()
  ctx.tree.set('campaigns', data.data.campaigns)
  ctx.render(campaigns)
}
