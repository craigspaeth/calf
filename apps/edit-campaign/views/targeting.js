import { view, dom } from 'view'
import {
  mediumMargin, smallMargin, containerMaxWidth, flatInput, flatLabel
} from 'style'
import tagsinput from './tagsinput'

const { div, label } = dom

const styles = {
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
  input: flatInput({
    marginTop: '5px',
    display: 'block',
    width: '100%'
  })
}

export default view((_, { tree }) => {
  const campaign = tree.select('campaign')
  const channels = tree.select('channels')
  return div({ style: styles.container },
    div({ style: styles.left },
      label({ style: styles.label }, 'Channels',
        tagsinput({
          style: styles.input,
          tags: campaign.select('channels'),
          suggestions: channels.get(),
          placeholder: 'Fashion or politics'
        })),
      label({ style: styles.label }, 'Location',
        tagsinput({
          style: styles.input,
          tags: campaign.select('regions'),
          suggestions: channels.get(),
          placeholder: (
            'Enter target state(s) or region(s) like ' +
            '“West coast” or “California”'
          )
        }))))
})
