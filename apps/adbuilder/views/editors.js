import veact from 'veact'
import { deepOcean, darkSlate, coolBlue, smallMargin, type } from 'style'
import colorpicker from './colorpicker'
import { draggable } from 'components/dndable'
import {
  onChangeEditorColor, onCancelEditor, onSaveEditor, onEndEditorDrag, state
} from '../controller'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { assign } from 'lodash'

const view = veact()
const { div, h3, button } = view.els()

const styles = {
  container: ({ x, y }) => ({
    position: 'fixed',
    top: y,
    left: x,
    backgroundColor: deepOcean,
    zIndex: 2,
    width: '300px',
    color: 'white',
    cursor: '-webkit-grab; -moz-grab'
  }),
  header: assign(type('smallCaps'), {
    textAlign: 'center',
    color: coolBlue,
    padding: `${smallMargin}px 0`,
    marginBottom: smallMargin,
    borderBottom: `1px solid ${darkSlate}`
  }),
  inner: {
    padding: `0 ${smallMargin}px ${smallMargin}px ${smallMargin}px`
  },
  button: assign(type('smallCaps'), {
    textAlign: 'center',
    width: '50%',
    backgroundColor: 'transparent',
    padding: '15px',
    color: darkSlate,
    borderBottom: 0,
    borderLeft: 0,
    borderTop: `1px solid ${darkSlate}`,
    borderRight: `1px solid ${darkSlate}`,
    cursor: 'pointer',
    transition: '0.3s color',
    outline: 'none',
    ':hover': {
      color: 'white'
    },
    ':lastChild': {
      borderRight: 0,
      color: 'white'
    }
  })
}

export const colorBlockPreview = ({ x, y, color, onChange, onCancel, onSave }) =>
  div({ style: styles.container({ x, y }) },
    h3({ style: styles.header }, 'Color Block'),
    div({ style: styles.inner },
      colorpicker({ color, onChange })),
      button({
        key: 'cancel',
        style: styles.button,
        onClick: onCancel
      }, 'Cancel'),
      button({
        key: 'save',
        style: styles.button,
        onClick: onSave
      }, 'Save'))

view.render(() => {
  return draggable({
    type: 'editor',
    beginDrag: () => ({ name: 'editor' }),
    endDrag: (_, monitor) => onEndEditorDrag(monitor)
  })(({ isDragging, connectDragSource, connectDragPreview }) => {
    if (typeof window !== 'undefined') connectDragPreview(getEmptyImage())
    if (isDragging) return null
    return connectDragSource(colorBlockPreview({
      x: state.get('editor').x,
      y: state.get('editor').y,
      color: state.get('editor').color,
      onCancel: () => onCancelEditor(state),
      onSave: () => onSaveEditor(state),
      onChange: (color) => onChangeEditorColor(color)
    }))
  })
})

export const colorBlock = view()
