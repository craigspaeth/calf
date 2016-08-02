import Baobab from 'baobab'

const isServer = typeof window === 'undefined'

// Make sure to turn off persistent features in the server for performance
const opts = isServer
  ? { asynchronous: false, persistent: false, immutable: false }
  : {}

const tree = new Baobab({}, opts)

// On the server we clear out the tree on every next tick so as to not leak
// data between requests. (TODO: Understand perf. implications)
if (isServer) setInterval(() => tree.unset())

export default (initState) => {
  tree.unset()
  tree.set(initState)
  return tree
}
