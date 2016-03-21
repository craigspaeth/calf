import Baobab from 'baobab'
import Campaigns from './campaigns'

export default () => {
  let tree = new Baobab({
    campaigns: []
  })
  let init = () => {
    let c = Campaigns.get()
    tree.set({ campaigns: c })
    return tree
  }
  return { tree: tree, init: init }
}
