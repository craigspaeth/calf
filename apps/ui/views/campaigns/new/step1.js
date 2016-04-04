import { flatInput } from 'style'
import { view, dom } from 'view'
import { updateAttr } from '../../../controllers/campaigns'
import { capitalize, snakeCase, assign } from 'lodash'

const { div, label, input } = dom

const style = {
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

export default view(({ campaign, tree }) => {
  const inputField = (attr, placeholder, ...inputStyles) => (
    label({
      style: assign({}, style.label, ...inputStyles),
      key: attr
    }, capitalize(snakeCase(attr).split('_')),
      input({
        key: attr,
        style: style.input,
        placeholder: placeholder,
        onChange: updateAttr(campaign, tree, attr),
        defaultValue: campaign.get(attr)
      }))
  )
  return div({ style: style.form },
    inputField('name', "e.g. Tiffany's Winter Sale"),
    inputField('startAt', 'e.g. 10/14/20',
      style.startEnd, { paddingRight: '10px' }),
    inputField('endAt', 'e.g. 10/14/20',
      style.startEnd, { paddingLeft: '10px' }))
})
