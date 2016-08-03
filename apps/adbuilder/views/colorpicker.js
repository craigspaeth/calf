import { Style } from 'radium'
import rcomp from 'rcomp'
import { ChromePicker } from 'react-color'

const comp = rcomp()

const { div, colorpicker, style } = comp.els({
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

comp.render(({ onChange, color }) => {
  return div({},
    style({ rules }),
    div({ className: 'colorpicker' },
      colorpicker({ type: 'chrome', color, onChange })))
})

export default comp()
