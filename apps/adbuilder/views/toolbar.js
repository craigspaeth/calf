import veact from 'veact'
import { darkSlate, smallMargin, deepOcean, headerHeight } from 'style'
import { draggable } from 'components/dndable'

const view = veact()
const { nav, button } = view.els()

const items = ['text', 'button', 'video', 'image', 'icon', 'slideshow', 'color']

view.styles({
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
})

view.render(() => {
  const navItems = items.map((char) =>
      draggable({
        type: 'toolbaritem',
        beginDrag: () => ({ type: char })
      })(({ isDragging, connectDragSource }) =>
        connectDragSource(
          button('.toolbarIcon', char[0]))))
  return nav('.toolbar', ...navItems)
})

export default view()
