import fetch from 'isomorphic-fetch'

let CALF_API_URL = process.env.CALF_API_URL

let api = (query, token) => {
  return fetch(`${CALF_API_URL}?query=` + query, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
}

export default api
