import React from 'react'
import functional from 'react-functional'
import Campaign from '../../models/campaign'
import { flatButton, type, mediumMargin } from '../../../../lib/style'

let { div, h1, p, button } = React.DOM

let newCampaign = () => {
  Campaign.create()
}

let render = (props) => (
  div({ style: styles.welcome },
    h1({ style: styles.h1 }, 'Welcome to AdRhino'),
    p({ style: styles.p }, `AdRhino is a platform for building beautiful ad units, worthy of your
      high quality content. To get started, try creating a new campaign.`),
    button({ style: styles.button, onClick: newCampaign }, 'Create new ad campaign'))
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
  }),
  p: type('mediumSansSerif', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`
  }),
  button: flatButton({
    display: 'inline-block',
    padding: '13px 27px'
  })
}

export default (props) => React.createElement(functional({ render }), props)
