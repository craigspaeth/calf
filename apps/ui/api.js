import fetch from 'isomorphic-fetch'

let api = (query, token) => {
  return fetch('/api?query=' + query, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
}

export default api
