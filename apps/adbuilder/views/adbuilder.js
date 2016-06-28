import { view, dom } from 'view'
import * as controller from '../controller'
import {
  darkSlate, smallMargin, deepOcean, headerHeight, centerOfParent, type,
  softGray
} from 'style'
import { draggable, droppable, dndable } from 'components/dndable'

const { nav, button, div, span } = dom

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
  },
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
  })
}

export default view((_, { tree }) => {
  const background = tree.select('campaign').select('background')
  const backgroundEl = background.get()
    ? div({ style: styles.bgColor(background) })
    : droppable({ key: 'dndable' },
        div({ style: styles.cta },
          span({ style: styles.text },
            'Drag and drop an image, video or color block to begin')))
  return dndable({},
    nav({ style: styles.toolbar },
      [
        'text', 'button', 'video', 'image', 'icon', 'slideshow',
        'color'
      ].map((char) =>
        draggable({
          key: 'dndable',
          attrs: { type: char },
          onDrop: (item) => controller.onDrop(tree, item)
        },
          button({ style: styles.toolbarIcon }, char[0])))),
    div({ style: styles.container }, backgroundEl))
})
