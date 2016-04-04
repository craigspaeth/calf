import fetch from 'isomorphic-fetch'

const CALF_API_URL = process.env.CALF_API_URL

const api = (query, token) => {
  return fetch(`${CALF_API_URL}?query=` + query, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
}

export default api
