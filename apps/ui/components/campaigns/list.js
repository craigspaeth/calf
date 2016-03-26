import { type, mediumMargin } from 'style'
import { view, dom } from 'view'

let { div, h1 } = dom

let styles = {
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
  div({ style: styles.welcome },
    h1({ style: styles.h1 }, 'See Campaigns Below'),
    props.campaigns.map((campaign) => div({}, campaign._id)))
))
