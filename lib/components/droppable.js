import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

const Dustbin = React.createClass({
  render () {
    console.log('s')
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    console.log('2')
    return connectDropTarget(this.props.render({ isActive }))
  }
})
Dustbin.propTypes = { connectDropTarget: PropTypes.func.isRequired }

export default (render) =>
  React.createElement(
    DropTarget(
      'dnd',
      {},
      (connect, monitor) => {
        console.log('3', connect.dropTarget()())
        return { connectDropTarget: connect.dropTarget() }
      }
    )(Dustbin), { render }
  )
