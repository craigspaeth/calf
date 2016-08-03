import rcomp from 'rcomp'
import {
  flatButton, headerHeight, type, smallMargin, darkSlate, softGray
} from 'style'
import logo from './logo'

const comp = rcomp()
const { nav, header, a, button } = comp.els()

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

comp.render((props) => (
  header({ style: styles.header },
    logo(),
    nav({ style: styles.nav },
      a({ style: styles.navA }, 'Developers'),
      a({ style: styles.navA }, 'Campaigns'),
      button({ style: styles.logout }, 'Logout')))
))

export default comp()
