import api from 'api'
import dashboard from '../views/dashboard'
import newCampaign from '../views/campaigns/new'

const TOTAL_STEPS = 4

const indexRoute = async (ctx, next) => {
  const res = await api(`{
    campaigns {
      _id
      name
      userId
    }
  }`)
  const data = await res.json()
  if (!ctx.tree.get('campaigns')) {
    ctx.tree.set('campaigns', data.data.campaigns)
  }
  ctx.render(dashboard)
}

const newRoute = (ctx) => {
  ctx.render(newCampaign)
}

const newCampaignNext = (step) => {
  const curStep = step.get() || 0
  if (curStep !== 0) step.set(curStep - 1)
}

const newCampaignPrev = (step) => {
  const curStep = step.get() || 0
  if (curStep < TOTAL_STEPS - 1) step.set(curStep + 1)
}

const saveAndQuitCampaign = () => {
  // const res = await api(`{
  //   mutation {
  //     updateCampaign() {}
  //   }
  // }`)
  // const data = await res.json()
  // if (!ctx.tree.get('campaigns')) {
  //   ctx.tree.set('campaigns', data.data.campaigns)
  // }
  // ctx.render(dashboard)
}

const updateAttr = (campaign, tree, attr) => (event) => {
  if (!campaign.get()) campaign.set({})
  campaign.set(attr, event.target.value)
}

export {
  indexRoute, newRoute, newCampaignNext, newCampaignPrev, saveAndQuitCampaign,
  updateAttr
}
