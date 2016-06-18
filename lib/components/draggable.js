import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd'

const source = {
  beginDrag: (props) => {
    return { name: props.name }
  },
  endDrag: (props, monitor) => {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log('dropped!', item, dropResult)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Item = React.createClass({
  render () {
    const { isDragging, connectDragSource, render } = this.props
    return connectDragSource(render({ isDragging }))
  }
})
Item.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default (render) =>
  React.createElement(
    DragSource('dnd', source, collect)(Item),
    { render }
  )
