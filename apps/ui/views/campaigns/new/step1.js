import { flatInput } from 'style'
import { view, dom } from 'view'

let { div, label, input } = dom

let style = {
  form: {
    maxWidth: '500px',
    margin: 'auto',
    position: 'relative'
  },
  label: {
    display: 'block',
    paddingBottom: '10px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  input: flatInput({
    display: 'block',
    marginTop: '5px',
    width: '100%'
  }),
  startEnd: {
    width: '50%',
    display: 'inline-block'
  }
}

export default view((props) => (
  div({ style: style.form },
    label({ style: style.label }, 'Name',
      input({
        style: style.input,
        placeholder: "e.g. Tiffany's Winter Sale"
      })),
    label({
      style: Object.assign({},
        style.label, style.startEnd, { paddingRight: '10px' })
    }, 'Start date',
      input({
        style: style.input,
        placeholder: 'e.g. 10/14/20'
      })),
    label({
      style: Object.assign({},
        style.label, style.startEnd, { paddingLeft: '10px' })
    }, 'End date',
      input({
        style: style.input,
        placeholder: 'e.g. 10/14/20'
      })))
))
