import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

const Dustbin = React.createClass({
  render () {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    return connectDropTarget(this.props.render({ isActive }))
  }
})
Dustbin.propTypes = { connectDropTarget: PropTypes.func.isRequired }

export default (render) =>
  React.createElement(
    DropTarget(
      'dnd',
      {},
      (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
    )(Dustbin), { render }
  )
