import React from 'react'
import functional from 'react-functional'
import { lightGray, flatButton } from '../../../../lib/style'
let fs = require('fs')

let { div, nav, header, a, button } = React.DOM
let logo = fs.readFileSync(__dirname + '/logo.svg').toString()

let render = (props) => (
  header({ style: style.header },
    div({
      dangerouslySetInnerHTML: { __html: logo },
      style: Object.assign({}, style.logo, style.logoLeftLabel)
    }),
    div({
      style: Object.assign({}, style.leftLabel, style.logoLeftLabel)
    }, 'Welcome to AdRhino'),
    nav({ style: style.nav },
      a({ style: style.navA }, 'Developers'),
      a({ style: style.navA }, 'Campaigns'),
      button({ style: style.logout }, 'Logout')))
)

let style = {
  header: {
    width: '100%',
    borderBottom: `1px solid ${lightGray}`,
    padding: '10px'
  },
  logo: {
    width: '40px',
    height: '30px',
    marginRight: '10px',
    borderRight: `1px solid ${lightGray}`,
    paddingRight: '10px'
  },
  logout: flatButton(),
  nav: {
    display: 'inline-block',
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  navA: {
    marginRight: '10px'
  },
  logoLeftLabel: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}

export default (props) => React.createElement(functional({ render }), props)
