import componext from 'componext'
import {
  flatButton, type, mediumMargin, headerHeight, centerOfParent, blueGradient
} from 'style'
import Radium from 'radium'

const comp = componext()
const { div, h1, p, a } = comp.els()

comp.decorators(Radium)

comp.styles({
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
})

comp.render(() =>
  div('.container',
    div('.welcome',
      h1('.h1', 'Welcome to AdRhino'),
      p('.p', `
        AdRhino is a platform for building beautiful ad units, worthy of your \
        high quality content. To get started, try creating a new campaign.
      `),
      a('.button', {
        href: '/campaigns/new',
        key: 'create'
      }, 'Create new ad campaign')))
)

export default comp()
