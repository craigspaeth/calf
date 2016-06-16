import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

const boxTarget = {
  drop: () => ({ name: 'Dustbin' })
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const Item = React.createClass({
  render () {
    const { canDrop, isOver, connectDropTarget, render } = this.props
    return connectDropTarget(render({ isActive: canDrop && isOver }))
  }
})
Item.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default (render) =>
  React.createElement(
    DropTarget('droppable', boxTarget, collect)(Item),
    { render }
  )
