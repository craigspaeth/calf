import api from 'api'
import page from 'page'

let indexRoute = async (ctx, next) => {
  let res = await api(`{
    campaigns {
      _id
      name
      userId
    }
  }`)
  let data = await res.json()
  if (!ctx.tree.get('campaigns')) {
    ctx.tree.set('campaigns', data.data.campaigns)
  }
  ctx.render('dashboard')
}

let newRoute = (ctx) => {
  ctx.render('campaigns/new')
}

let addCampaign = () => {
  page('/campaigns/new')
}

export { addCampaign, indexRoute, newRoute }
