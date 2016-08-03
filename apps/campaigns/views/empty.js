import componext from 'componext'
import {
  flatButton, type, mediumMargin, headerHeight, centerOfParent, blueGradient
} from 'style'

const { div, h1, p, a } = componext.els()

const styles = {
  welcome: [
    centerOfParent(),
    {
      maxWidth: '520px',
      textAlign: 'center'
    }
  ],
  container: {
    background: blueGradient,
    height: `calc(100% - ${headerHeight}px)`,
    paddingTop: `${headerHeight}px`
  },
  h1: type('largeHeader', {
    textAlign: 'center',
    color: 'white'
  }),
  p: type('largeBody', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`,
    color: 'white'
  }),
  button: [
    flatButton('hot', {
      display: 'inline-block',
      padding: '13px 27px'
    }),
    type('mediumCaps')
  ]
}

export default () =>
  div({ style: styles.container },
    div({ style: styles.welcome },
      h1({ style: styles.h1 }, 'Welcome to AdRhino'),
      p({ style: styles.p }, `
        AdRhino is a platform for building beautiful ad units, worthy of your \
        high quality content. To get started, try creating a new campaign.
      `),
      a({
        style: styles.button,
        href: '/campaigns/new',
        key: 'create'
      }, 'Create new ad campaign')))
