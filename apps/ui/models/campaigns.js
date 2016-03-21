import api from 'lib/api'

let get = async () => {
  let res = await api(`{
    campaigns {
      _id
      name
      userId
    }
  }`)
  return res.json()
}

export default {
  get: get
}
