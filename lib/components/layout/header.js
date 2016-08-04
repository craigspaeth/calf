import veact from 'veact'
import {
  flatButton, headerHeight, type, smallMargin, darkSlate, softGray
} from 'style'
import logo from './logo'

const view = veact()
const { nav, header, a, button } = view.els()

const styles = {
  header: {
    height: headerHeight,
    width: '100%',
    backgroundColor: 'white',
    color: darkSlate,
    padding: '10px',
    position: 'relative',
    zIndex: 1,
    borderBottom: `1px solid ${softGray}`
  },
  logout: flatButton('dark'),
  nav: {
    display: 'inline-block',
    position: 'absolute',
    right: '15px',
    top: '10px'
  },
  navA: [{ marginRight: smallMargin }, type('smallCaps')]
}

view.render((props) => (
  header({ style: styles.header },
    logo(),
    nav({ style: styles.nav },
      a({ style: styles.navA }, 'Developers'),
      a({ style: styles.navA }, 'Campaigns'),
      button({ style: styles.logout }, 'Logout')))
))

export default view()
