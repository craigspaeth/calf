import veact from 'veact'

const view = veact()
const { div } = view.els()

view.render((props) => (
  div({}, 'STEP 4')
))

export default view()
