import tree from 'universal-tree'
import api from 'api'
import { headerHeight, smallMargin } from 'style'
import editCampaignState from 'components/edit-campaign/initial-state'
import { assign } from 'lodash'

export const state = tree(assign({
  editor: null,
  focusedSection: null
}, editCampaignState))

export const onDropToolbarItem = (monitor, index) => {
  const { x } = monitor.getClientOffset()
  const section = ['firstSection', 'middleSection', 'lastSection'][index]
  if (monitor.getItem().type === 'color') {
    state.set('editor', {
      x: x + 20,
      y: headerHeight + smallMargin,
      type: 'color',
      color: '#A812B8'
    })
    state.set('focusedSection', section)
  }
}

export const onDropBackground = (monitor) => {
  const { x } = monitor.getClientOffset()
  if (monitor.getItem().type === 'color') {
    state.set('editor', {
      x: x + 20,
      y: headerHeight + smallMargin,
      type: 'color',
      color: '#A812B8'
    })
    state.select('campaign', 'frames', 0, 'background')
      .set({ type: 'color', color: '#A812B8' })
  }
}

export const onEndEditorDrag = (monitor) => {
  const editor = state.select('editor')
  const delta = monitor.getDifferenceFromInitialOffset()
  const { x, y } = editor.get()
  editor.set('x', x + delta.x)
  editor.set('y', y + delta.y)
}

export const onChangeEditorColor = async (color) => {
  const background = state.select('campaign', 'frames', 0, 'background')
  state.select('editor').set('color', color.hex)
  if (background.get()) {
    await api(`
      mutation {
        saveCampaign(
          frames: [{
            ${state.get('focusedSection')}: {
              blocks: [{
                color: "${color.hex.replace('#', '')}"
              }]
            }
          }]
        ) { _id }
      }
    `)
    tree
      .select('campaign', 'frames', 0, state.get('focusedSection'))
      .select('blocks', 0)
      .set('color', color.hex)
  } else background.set('color', color.hex)
}

export const onCancelEditor = (tree) => {
  state.select('editor').set(null)
  state.select('campaign', 'frames', 0, 'background')
    .set(null)
}

export const onSaveEditor = async (tree) => {
  const col = state.select('campaign', 'frames', 0, 'background')
    .get('color').replace('#', '')
  await api(`
    mutation {
      saveCampaign(frames: [{ background: { color: "${col}" } }]) {
        _id
      }
    }
  `)
  state.set('editor', null)
}
