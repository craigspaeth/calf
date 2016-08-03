import rcomp from 'rcomp'
import {
  mediumMargin, smallMargin, containerMaxWidth, flatInput, flatLabel
} from 'style'
import { state } from '../controller'
import TagsInput from './tagsinput'

const campaign = state.select('campaign')
const channels = state.select('channels')
const comp = rcomp()
const { div, label, tagsinput } = comp.els({ tagsinput: TagsInput })

comp.styles({
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

comp.render(() =>
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

export default comp()
