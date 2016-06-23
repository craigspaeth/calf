import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

const Dustbin = React.createClass({
  render () {
<<<<<<< HEAD
    console.log('s')
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    console.log('2')
=======
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
>>>>>>> cb7887e556148985da8e70aaf866fddc3eeac7af
    return connectDropTarget(this.props.render({ isActive }))
  }
})
Dustbin.propTypes = { connectDropTarget: PropTypes.func.isRequired }

export default (render) =>
  React.createElement(
    DropTarget(
      'dnd',
      {},
<<<<<<< HEAD
      (connect, monitor) => {
        console.log('3', connect.dropTarget()())
        return { connectDropTarget: connect.dropTarget() }
      }
=======
      (connect, monitor) => ({ connectDropTarget: connect.dropTarget() })
>>>>>>> cb7887e556148985da8e70aaf866fddc3eeac7af
    )(Dustbin), { render }
  )
