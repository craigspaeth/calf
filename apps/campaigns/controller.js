import api from 'api'
import campaigns from './views'
import Baobab from 'baobab'
import { memoize } from 'lodash'

const wrap = typeof window === 'undefined' ? (fn) => fn : memoize
export const state = wrap(() => new Baobab({
  campaigns: [],
  campaign: null
}))

export const indexRoute = async (ctx, next) => {
  const data = await api(`{
    campaigns { _id name startAt endAt channels regions }
  }`)
  state().set('campaigns', data.campaigns)
  ctx.render(campaigns)
}
