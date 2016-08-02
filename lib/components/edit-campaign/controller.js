import api from 'api'
import { compact, map, isObject, isArray } from 'lodash'

const isBrowser = typeof window !== 'undefined'

export const saveAndQuit = async (campaign) => {
  const jsonToArgs = (obj) => {
    return compact(map(obj, (val, key) => {
      let v
      if (isObject(val) && isArray(val)) {
        v = '[' + val.map((v) => isObject(val)
          ? `{ ${jsonToArgs(v)} }`
          : JSON.stringify(val)
        ) + ']'
      } else if (isObject(val)) {
        v = `{ ${jsonToArgs(val)} }`
      } else {
        v = JSON.stringify(val)
      }
      return val ? `${key}: ${v}` : null
    })).join(' ')
  }
  const args = jsonToArgs(campaign.get())
  await api(`mutation { saveCampaign(${args}) { _id } }`)
  window.location.assign('/')
}

export const del = async (campaign) => {
  if (!window.confirm('Are you sure you want to delete this campaign?')) return
  await api(`
    mutation {
      deleteCampaign(_id: "${campaign.get('_id')}") { _id }
    }
  `)
  window.location.assign('/')
}

export const maybeEnableNextStep = (state) => {
  const { name, startAt, endAt } = state.get('campaign')
  if (name && startAt && endAt) state.select('enableNextStep').set(true)
}

export const render = (state, step) => async (ctx, next) => {
  if (ctx.params.id) {
    const { regions, channels, campaign } = await api(`{
      regions
      channels
      campaign(_id: "${ctx.params.id}") {
         _id name startAt endAt channels regions
         frames {
            background { src color }
         }
      }
    }`)
    state.set({ regions, channels, campaign })
    state.set('step', step)
  }
  if (isBrowser) maybeEnableNextStep(state)
  await next()
}
