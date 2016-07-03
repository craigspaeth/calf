import React from 'react'
import { DragDropContext, DragSource, DropTarget, DragLayer } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Radium from 'radium'
import { pick } from 'lodash'
const { div } = React.DOM

// Draggable
export const draggable = (opts) => (comp) => {
  const Component = DragSource(
    opts.type,
    pick(opts, 'beginDrag', 'endDrag', 'canDrag', 'isDragging'),
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  )(Radium(comp))
  return React.createElement(Component)
}

// Droppable
export const droppable = (opts) => (comp) => {
  const Component = DropTarget(
    opts.type,
    pick(opts, 'drop'),
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getClientOffset: monitor.getClientOffset()
    })
  )(Radium(comp))
  return React.createElement(Component)
}

// DragLayer
export const draglayer = (opts) => (comp) => {
  const Component = DragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  )(Radium(comp))
  return React.createElement(Component)
}

// Dndable
export const dndable = (props, ...children) => {
  const Component = DragDropContext(HTML5Backend)(
    Radium(() => div(props, ...children)))
  return React.createElement(Component)
}
