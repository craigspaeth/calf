import { type, mediumMargin } from 'style'
import { view, dom } from 'view'

const { div, h1 } = dom

const style = {
  welcome: {
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'center'
  },
  h1: type('largeSansSerif', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`
  })
}

export default view((props) => (
  div({ style: style.welcome },
    h1({ style: style.h1 }, 'See Campaigns Below'),
    props.campaigns.map((campaign) => div({}, campaign._id)))
))
