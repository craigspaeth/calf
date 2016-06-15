import { view, dom } from 'view'
import { darkSlate, smallMargin, deepOcean } from 'style'
import dropzone from './dropzone'

const { nav, button, div } = dom

const styles = {
  toolbar: {
    position: 'absolute',
    top: smallMargin,
    left: smallMargin,
    backgroundColor: deepOcean,
    zIndex: 2
  },
  toolbarIcon: {
    borderBottom: `1px solid ${darkSlate}`,
    padding: `${smallMargin}px`,
    color: 'white',
    display: 'block',
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: '-webkit-grab',
    outline: 'none'
  }
}

export default view((props) => (
  div({},
    nav({ style: styles.toolbar },
      ['T', 'B', 'V', 'I', 'P', 'S', 'C'].map((char) =>
        button({ style: styles.toolbarIcon }, char))),
    dropzone({ style: styles.cta },
      'Drag and drop an image, video or color block to begin')
  )
))
