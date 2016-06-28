import api from 'api'
import { compact, map, isObject, isArray } from 'lodash'

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
  const method = campaign.get('_id') ? 'updateCampaign' : 'createCampaign'
  await api(`mutation { ${method}(${args}) { _id } }`)
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

export const maybeEnableNextStep = (tree) => {
  const { name, startAt, endAt } = tree.get('campaign')
  if (name && startAt && endAt) tree.select('enableNextStep').set(true)
}

export const render = (comp, step) => async (ctx) => {
  if (ctx.params.id) {
    const data = await api(`{
      regions
      channels
      campaign(_id: "${ctx.params.id}") {
         _id name startAt endAt channels regions
         frames {
            background { src }
         }
      }
    }`)
    ctx.tree.set('regions', data.regions)
    ctx.tree.set('channels', data.channels)
    ctx.tree.set('campaign', data.campaign)
    if (step) ctx.tree.set('step', step)
  }
  ctx.render(comp)
  if (ctx.browser) maybeEnableNextStep(ctx.tree)
}
