import { view, dom } from 'view'
import { deepOcean, centerOfParent, type, softGray } from 'style'
import { droppable, dndable, draglayer } from 'components/dndable'
import toolbar from './toolbar'
import * as editors from './editors'
import { onDropBackground, onDropToolbarItem } from '../controller'

const { div, span } = dom

const styles = {
  container: [centerOfParent(), {
    width: '100%',
    height: '400px',
    position: 'absolute'
  }],
  cta: [type('mediumHeader'), {
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: '400px',
    border: `3px dashed ${softGray}`,
    color: softGray
  }],
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

export default view((_, { tree }) => {
  const background = tree.select('campaign', 'frames', 0, 'background')
  const dropzone = (index) => {
    const section = ['firstSection', 'middleSection', 'lastSection'][index]
    const blocks = tree
      .select('campaign', 'frames', 0, section)
      .select('blocks').get()
    return droppable({
      type: 'toolbaritem',
      drop: (_, monitor) => onDropToolbarItem(tree, monitor, index)
    })(({ isOver, connectDropTarget }) =>
      connectDropTarget(
        div({ style: styles.dropzone({ isOver }) },
          blocks.map((block) => div({ style: styles.block(block) })))))
  }
  const backgroundEl = background.get()
    ? div({},
        dropzone(0),
        dropzone(1),
        dropzone(2),
        div({ style: styles.bgColor(background) }))
    : droppable({
      type: 'toolbaritem',
      drop: (_, monitor) => onDropBackground(tree, monitor)
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
            color: tree.get('editor').color
          })
        }
        return null
      }),
      toolbar({}),
      tree.get('editor') && {
        color: editors.colorBlock({})
      }[tree.get('editor').type],
      div({ style: styles.container }, backgroundEl))
})
