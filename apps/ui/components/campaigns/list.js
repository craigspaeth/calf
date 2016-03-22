import React from 'react'
import functional from 'react-functional'
import { type, mediumMargin } from '../../../../lib/style'

let { div, h1 } = React.DOM

let render = (props) => (
  div({ style: styles.welcome },
    h1({ style: styles.h1 }, 'See Campaigns Below'),
    props.campaigns.map((campaign) => div({}, campaign._id)))
)

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

export default (props) => React.createElement(functional({ render }), props)
