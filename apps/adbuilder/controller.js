import { headerHeight, smallMargin } from 'style'
import api from 'api'

export const onDropToolbarItem = (tree, monitor) => {
  const { x } = monitor.getClientOffset()
  if (monitor.getItem().type === 'color') {
    tree.set('editor', {
      x: x + 20,
      y: headerHeight + smallMargin,
      type: 'color',
      color: '#A812B8'
    })
    tree.select('campaign', 'frames', 0, 'background')
      .set({ type: 'color', color: '#A812B8' })
  }
}

export const onEndEditorDrag = (tree, monitor) => {
  const editor = tree.select('editor')
  const delta = monitor.getDifferenceFromInitialOffset()
  const { x, y } = editor.get()
  editor.set('x', x + delta.x)
  editor.set('y', y + delta.y)
}

export const onChangeEditorColor = (tree, color) => {
  tree.select('editor').set('color', color.hex)
  tree.select('campaign', 'frames', 0, 'background')
    .set('color', color.hex)
}

export const onCancelEditor = (tree) => {
  tree.select('editor').set(null)
  tree.select('campaign', 'frames', 0, 'background')
    .set(null)
}

export const onSaveEditor = async (tree) => {
  const col = tree.select('campaign', 'frames', 0, 'background')
    .get('color').replace('#', '')
  await api(`
    mutation {
      updateCampaign(frames: [{ background: { color: "${col}" } }]) {
        _id
      }
    }
  `)
  tree.set('editor', null)
}
