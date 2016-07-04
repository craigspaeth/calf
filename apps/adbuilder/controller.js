import { headerHeight, smallMargin } from 'style'
import api from 'api'

export const onDropToolbarItem = (tree, monitor, index) => {
  const { x } = monitor.getClientOffset()
  const section = ['firstSection', 'middleSection', 'lastSection'][index]
  if (monitor.getItem().type === 'color') {
    tree.set('editor', {
      x: x + 20,
      y: headerHeight + smallMargin,
      type: 'color',
      color: '#A812B8'
    })
    tree.set('focusedSection', section)
  }
}

export const onDropBackground = (tree, monitor) => {
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

export const onChangeEditorColor = async (tree, color) => {
  const background = tree.select('campaign', 'frames', 0, 'background')
  tree.select('editor').set('color', color.hex)
  if (background.get()) {
    await api(`
      mutation {
        updateCampaign(
          frames: [{
            ${tree.get('focusedSection')}: {
              blocks: [{
                color: "${color.hex.replace('#', '')}"
              }]
            }
          }]
        ) { _id }
      }
    `)
    tree
      .select('campaign', 'frames', 0, tree.get('focusedSection'))
      .select('blocks', 0)
      .set('color', color.hex)
  } else background.set('color', color.hex)
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
