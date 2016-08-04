import veact from 'veact'
import {
  mediumMargin, smallMargin, containerMaxWidth, flatInput, flatLabel
} from 'style'
import { state } from '../controller'
import TagsInput from './tagsinput'

const campaign = state.select('campaign')
const channels = state.select('channels')
const view = veact()
const { div, label, tagsinput } = view.els({ tagsinput: TagsInput })

view.styles({
  container: {
    maxWidth: containerMaxWidth,
    margin: 'auto'
  },
  left: {
    width: '50%',
    paddingRight: mediumMargin / 2
  },
  right: {
    width: '50%',
    paddingLeft: mediumMargin / 2
  },
  label: flatLabel({
    marginBottom: smallMargin
  }),
  taginput: flatInput({
    marginTop: '5px',
    display: 'block',
    width: '100%'
  })
})

view.render(() =>
  div('.container',
    div('.left',
      label('.label', 'Channels',
        tagsinput('.input', {
          tags: campaign.select('channels'),
          suggestions: channels.get(),
          placeholder: 'Fashion or politics'
        })),
      label('.label', 'Location',
        tagsinput('.taginput', {
          tags: campaign.select('regions'),
          suggestions: channels.get(),
          placeholder: (
            'Enter target state(s) or region(s) like ' +
            '“West coast” or “California”'
          )
        }))))
)

export default view()
