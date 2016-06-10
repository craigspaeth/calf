import fetch from 'isomorphic-fetch'
import _debug from 'debug'

const debug = _debug('api')
const CALF_API_URL = process.env.CALF_API_URL

const api = async (query, token) => {
  const q = query.replace(/\s+/gm, ' ')
  debug('Sending', q)
  const res = await fetch(`${CALF_API_URL}?query=` + encodeURIComponent(q), {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
  const { data, errors } = await res.json()
  if (errors) {
    const err = new Error(errors.map((e) => e.message).join('\n'))
    err.status = res.status
    debug('Error', JSON.stringify(errors))
    throw err
  }
  debug('Recieved', data)
  return data
}

export default api
