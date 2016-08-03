import rcomp from 'rcomp'

const comp = rcomp()
const { div } = comp.els()

comp.render((props) => (
  div({}, 'STEP 4')
))

export default comp()
