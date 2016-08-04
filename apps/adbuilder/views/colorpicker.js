import { Style } from 'radium'
import veact from 'veact'
import { ChromePicker } from 'react-color'

const view = veact()

const { div, colorpicker, style } = view.els({
  colorpicker: ChromePicker,
  style: Style
})

const rules = {
  '.colorpicker > div': {
    width: '100% !important',
    boxShadow: 'none !important',
    borderRadius: '0 !important'
  }
}

view.render(({ onChange, color }) => {
  return div({},
    style({ rules }),
    div({ className: 'colorpicker' },
      colorpicker({ type: 'chrome', color, onChange })))
})

export default view()
