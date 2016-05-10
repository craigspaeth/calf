import { view, dom } from 'view'
import { darkSlate, smallMargin, deepOcean } from 'style'

const { nav, button } = dom

const styles = {
  toolbar: {
    position: 'absolute',
    top: smallMargin,
    left: smallMargin,
    backgroundColor: deepOcean
  },
  toolbarIcon: {
    borderBottom: `1px solid ${darkSlate}`,
    padding: `${smallMargin}px`,
    color: 'white',
    display: 'block',
    backgroundColor: 'transparent',
    border: 0
  }
}

export default view((props) => (
  nav({ style: styles.toolbar },
    ['T', 'B', 'V', 'I', 'P', 'S', 'C'].map((char) =>
      button({ style: styles.toolbarIcon }, char)))
))
