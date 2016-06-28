import React from 'react'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Radium from 'radium'
const { div } = React.DOM

// Draggable
export const draggable = (props, ...children) => {
  const Draggable = (p) => p.connectDragSource(div(props, ...children))
  const Component = DragSource(props.key, {
    beginDrag: () => (props.attrs),
    endDrag: (_, monitor) => {
      if (monitor.getDropResult()) {
        props.onDrop && props.onDrop(monitor.getItem(), monitor.getDropResult())
      }
    }
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(Radium(Draggable))
  return React.createElement(Component)
}

// Droppable
export const droppable = (props, ...children) => {
  const Droppable = ({ canDrop, isOver, connectDropTarget }) => {
    return connectDropTarget(div(props, ...children))
  }
  const Component = DropTarget(
    props.key,
    { drop: props.drop || (() => {}) },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  )(Radium(Droppable))
  return React.createElement(Component)
}

// Dndable
export const dndable = (props, ...children) => {
  const Component = DragDropContext(HTML5Backend)(
    Radium(() => div(props, ...children)))
  return React.createElement(Component)
}
