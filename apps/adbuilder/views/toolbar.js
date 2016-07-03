import { view, dom } from 'view'
import * as controller from '../controller'
import { darkSlate, smallMargin, deepOcean, headerHeight } from 'style'
import { draggable } from 'components/dndable'

const { nav, button } = dom

const items = ['text', 'button', 'video', 'image', 'icon', 'slideshow', 'color']

const styles = {
  toolbar: {
    position: 'absolute',
    top: smallMargin + headerHeight,
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
    outline: 'none',
    textTransform: 'uppercase'
  }
}

export default view((_, { tree }) => {
  return nav({ style: styles.toolbar },
    items.map((char) =>
      draggable({
        type: 'toolbaritem',
        beginDrag: () => ({ type: char }),
        endDrag: (_, monitor) => {
          if (monitor.getDropResult()) {
            controller.onDrop(tree, monitor.getItem())
          }
        }
      })(({ isDragging, connectDragSource }) =>
        connectDragSource(
          button({ style: styles.toolbarIcon }, char[0])))))
})
