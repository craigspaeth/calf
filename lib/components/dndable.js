import React from 'react'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const { div } = React.DOM

// Draggable
export const draggable = (props, ...children) => {
  const Component = DragSource(props.key, {
    beginDrag: (props) => ({ name: 'Draggable' }),
    endDrag: (props, monitor) => {
      if (monitor.getDropResult()) {
        console.log('Dropped!', monitor.getItem(), monitor.getDropResult())
      }
    }
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))((p) => p.connectDragSource(div(props, ...children)))
  return React.createElement(Component)
}

// Droppable
export const droppable = (props, ...children) => {
  const Droppable = (props) => {
    const { canDrop, isOver, connectDropTarget } = props
    return connectDropTarget(
      div({}, canDrop && isOver ? 'Release to drop' : 'Drop here')
    )
  }
  const Component = DropTarget(
    props.key,
    { drop: () => ({ name: 'Droppable' }) },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  )(Droppable)
  return React.createElement(Component, props, ...children)
}

// Dndable
export const dndable = (props, ...children) =>
  React.createElement(
    DragDropContext(HTML5Backend)(() => div(props, ...children))
  )
