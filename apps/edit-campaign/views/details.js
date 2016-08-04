import veact from 'veact'
import { flatInput, flatLabel, headerHeight, mediumMargin } from 'style'
import { updateAttr, state } from '../controller'
import { capitalize, snakeCase } from 'lodash'
import moment from 'moment'
import Radium from 'radium'

const view = veact()
const { div, label, input } = view.els()

view.decorators(Radium)

view.styles({
  form: {
    maxWidth: '500px',
    margin: 'auto',
    position: 'relative',
    top: `${headerHeight * 2 + mediumMargin}px`
  },
  input: flatInput({
    display: 'block',
    marginTop: '5px',
    width: '100%'
  }),
  name: flatLabel({
    marginBottom: '10px',
    width: '100%'
  }),
  startAt: flatLabel({
    marginBottom: '10px',
    width: '50%',
    display: 'inline-block',
    paddingRight: '10px'
  }),
  endAt: flatLabel({
    marginBottom: '10px',
    width: '50%',
    display: 'inline-block',
    paddingLeft: '10px'
  })
})

view.render(() => {
  const campaign = state.select('campaign')
  const inputField = (attr, placeholder, extraStyle) => {
    const val = campaign.get(attr)
    return label(`.${attr}`, { key: attr },
      capitalize(snakeCase(attr).split('_').join(' ')),
      input('.input', {
        key: attr,
        placeholder: placeholder,
        onKeyUp: (e) => updateAttr(attr, e.target.value),
        defaultValue: attr === 'startAt' || attr === 'endAt'
          ? val && moment(val).format('MM/DD/YYYY')
          : val
      }))
  }
  return div('.form',
    inputField('name', "e.g. Tiffany's Winter Sale"),
    inputField('startAt', 'e.g. 10/14/20'),
    inputField('endAt', 'e.g. 10/14/20'))
})

export default view()
