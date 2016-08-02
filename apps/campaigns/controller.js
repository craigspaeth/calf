import api from 'api'
import tree from 'universal-tree'

export const state = tree({
  campaigns: [],
  campaign: null
})

export const indexRoute = async (ctx, next) => {
  console.log('getting')
  const data = await api(`{
    campaigns { _id name startAt endAt channels regions }
  }`)
  console.log('setting state')
  state.set({ campaigns: data.campaigns })
  console.log('set state')
  next()
}
