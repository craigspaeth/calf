import { lightGray, flatButton } from 'style'
import { view, dom, svgfile } from 'view'
const fs = require('fs')

const { div, nav, header, a, button } = dom

const style = {
  header: {
    width: '100%',
    borderBottom: `1px solid ${lightGray}`,
    padding: '10px',
    position: 'relative',
    zIndex: 1
  },
  logo: {
    width: '40px',
    height: '30px',
    marginRight: '10px',
    borderRight: `1px solid ${lightGray}`,
    paddingRight: '10px'
  },
  logout: flatButton('light'),
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

export default view((props) => (
  header({ style: style.header },
    a({ href: '/' },
      svgfile({
        src: fs.readFileSync(__dirname + '/logo.svg'),
        style: Object.assign({}, style.logo, style.logoLeftLabel)
      })),
    div({
      style: Object.assign({}, style.leftLabel, style.logoLeftLabel)
    }, 'Welcome to AdRhino'),
    nav({ style: style.nav },
      a({ style: style.navA }, 'Developers'),
      a({ style: style.navA }, 'Campaigns'),
      button({ style: style.logout }, 'Logout')))
))
