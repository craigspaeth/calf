import React from 'react'
import { view, dom } from 'view'
import { ChromePicker } from 'react-color'
import { Style } from 'radium'

const { div } = dom
const colorpicker = (props) => React.createElement(ChromePicker, props)
const style = (props) => React.createElement(Style, props)
const rules = {
  '.colorpicker > div': {
    width: '100% !important',
    boxShadow: 'none !important',
    borderRadius: '0 !important'
  }
}

export default view(({ onChange }) => {
  return div({},
    style({ rules }),
    div({ className: 'colorpicker' },
      colorpicker({ type: 'chrome' })))
})
