import React from 'react'
import { view, dom, style } from 'view'
import { ChromePicker } from 'react-color'

const { div } = dom

const colorpicker = (props) => React.createElement(ChromePicker, props)

const rules = {
  '.colorpicker > div': {
    width: '100% !important',
    boxShadow: 'none !important',
    borderRadius: '0 !important'
  }
}

export default view(({ onChange, color }) => {
  return div({},
    style({ rules }),
    div({ className: 'colorpicker' },
      colorpicker({ type: 'chrome', color, onChange })))
})
