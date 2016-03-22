import api from 'lib/api'

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

export default {
  get: get
}
