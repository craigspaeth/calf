import { softGray, flatButton, headerHeight, type, smallMargin } from 'style'
import { view, dom } from 'view'
import logo from './logo'

const { nav, header, a, button } = dom

const styles = {
  header: {
    height: headerHeight,
    width: '100%',
    borderBottom: `1px solid ${softGray}`,
    padding: '10px',
    position: 'relative',
    zIndex: 1
  },
  logout: flatButton('light'),
  nav: {
    display: 'inline-block',
    position: 'absolute',
    right: '15px',
    top: '10px'
  },
  navA: [{ marginRight: smallMargin }, type('smallCaps')]
}

export default view((props) => (
  header({ style: styles.header },
    logo(),
    nav({ style: styles.nav },
      a({ style: styles.navA }, 'Developers'),
      a({ style: styles.navA }, 'Campaigns'),
      button({ style: styles.logout }, 'Logout')))
))
