import Baobab from 'baobab'
import Campaigns from './campaigns'

export default () => {
  let tree = new Baobab({
    campaigns: []
  })
  let init = async () => {
    let campaigns = await Campaigns.get()
    tree.set({ campaigns: campaigns })
    return tree
  }
  return { tree: tree, init: init }
}
