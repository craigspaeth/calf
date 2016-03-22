import api from '../../../lib/api'

let get = async () => {
  let res = await api(`{
    campaigns {
      _id
      name
      userId
    }
  }`)
  let body = await res.json()
  return body.data.campaigns
}

let create = async () => {
  let res = await api(`mutation {
    saveCampaign {
      _id
      name
      userId
    }
  }`)
  let body = await res.json()
  let newCampaign = body.data.saveCampaign
  // Pushes to the campaigns part of the baobab tree
  // Root component listents to tree changes and re-renders
  //
}

export default { get }
