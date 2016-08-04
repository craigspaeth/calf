import veact from 'veact'
import { deepOcean, centerOfParent, type, softGray } from 'style'
import { droppable, dndable, draglayer } from 'components/dndable'
import toolbar from './toolbar'
import * as editors from './editors'
import { onDropBackground, onDropToolbarItem, state } from '../controller'
import { assign } from 'lodash'

const view = veact()
const { div, span } = view.els()

const styles = {
  container: assign(centerOfParent(), {
    width: '100%',
    height: '400px',
    position: 'absolute'
  }),
  cta: assign(type('mediumHeader'), {
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: '400px',
    border: `3px dashed ${softGray}`,
    color: softGray
  }),
  text: {
    textAlign: 'center',
    color: deepOcean,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  bgColor: (background) => ({
    backgroundColor: background.get('color'),
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  }),
  dropzone: ({ isOver }) => ({
    height: '100%',
    width: '33.3333%',
    position: 'relative',
    zIndex: 2,
    display: 'inline-block',
    border: isOver ? '2px solid red' : 0
  }),
  block: (block) => ({
    backgroundColor: block.color,
    width: '100%',
    height: '100%'
  })
}

view.render(() => {
  const background = state.select('campaign', 'frames', 0, 'background')
  const dropzone = (index) => {
    const section = ['firstSection', 'middleSection', 'lastSection'][index]
    const blocks = state
      .select('campaign', 'frames', 0, section)
      .select('blocks').get()
    return droppable({
      type: 'toolbaritem',
      drop: (_, monitor) => onDropToolbarItem(monitor, index)
    })(({ isOver, connectDropTarget }) =>
      connectDropTarget(
        div({ style: styles.dropzone({ isOver }) },
          blocks && blocks.map((block) => div({ style: styles.block(block) })))))
  }
  const backgroundEl = background.get()
    ? div({},
        dropzone(0),
        dropzone(1),
        dropzone(2),
        div({ style: styles.bgColor(background) }))
    : droppable({
      type: 'toolbaritem',
      drop: (_, monitor) => onDropBackground(monitor)
    })(({ connectDropTarget }) =>
        connectDropTarget(
          div({ style: styles.cta },
            span({ style: styles.text },
              'Drag and drop an image, video or color block to begin'))))
  return dndable({},
      draglayer({})(({ itemType, currentOffset }) => {
        if (itemType === 'editor') {
          return editors.colorBlockPreview({
            x: currentOffset.x,
            y: currentOffset.y,
            color: state.get('editor').color
          })
        }
        return null
      }),
      toolbar({}),
      state.get('editor') && {
        color: editors.colorBlock({})
      }[state.get('editor').type],
      div({ style: styles.container }, backgroundEl))
})

export default view()
