import { flatButton, type, mediumMargin } from 'style'
import { view, dom } from 'view'

const { div, h1, p, a } = dom

const style = {
  welcome: {
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'center'
  },
  h1: type('largeSansSerif', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`
  }),
  p: type('mediumSansSerif', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`
  }),
  button: flatButton('light', {
    display: 'inline-block',
    padding: '13px 27px'
  })
}

export default view((props) => (
  div({ style: style.welcome },
    h1({ style: style.h1 }, 'Welcome to AdRhino'),
    p({ style: style.p }, `
      AdRhino is a platform for building beautiful ad units, worthy of your \
      high quality content. To get started, try creating a new campaign.
    `),
    a({
      style: style.button,
      href: '/campaigns/new'
    }, 'Create new ad campaign'))
))
