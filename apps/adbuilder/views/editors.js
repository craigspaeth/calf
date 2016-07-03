import { view, dom } from 'view'
import { deepOcean, darkSlate, coolBlue, smallMargin, type } from 'style'
import colorpicker from './colorpicker'
import { draggable } from 'components/dndable'
import * as controller from '../controller'

const { div, h3 } = dom
const styles = {
  container: ({ x, y }, hidden) => ({
    position: 'fixed',
    top: y,
    left: x,
    backgroundColor: deepOcean,
    zIndex: 2,
    width: '300px',
    color: 'white',
    cursor: '-webkit-grab; -moz-grab',
    opacity: hidden ? 0 : 1
  }),
  header: [type('smallCaps'), {
    textAlign: 'center',
    color: coolBlue,
    padding: `${smallMargin}px 0`,
    marginBottom: smallMargin,
    borderBottom: `1px solid ${darkSlate}`
  }],
  inner: {
    padding: smallMargin
  }
}

export const colorBlock = view((_, { tree }) => {
  return draggable({
    type: 'editor',
    beginDrag: () => ({ name: 'editor' }),
    endDrag: (_, monitor) => controller.onEndEditorDrag(tree, monitor)
  })(({ isDragging, connectDragSource }) =>
    connectDragSource(
      div({ style: styles.container(tree.get('editor'), isDragging) },
        h3({ style: styles.header }, 'Color Block'),
        div({ style: styles.inner }))))
})
