import React from 'react'
import { view, dom } from 'view'
import { onChangeChannels } from '../../../controllers/campaigns'
import {
  mediumMargin, smallMargin, containerMaxWidth, flatInput, flatLabel
} from 'style'
import TagsInput from 'react-tagsinput'

const tagsinput = (props) => React.createElement(TagsInput, props)
const { div, label, input } = dom

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

export default view(({ campaign }) => (
  div({ style: styles.container },
    div({ style: styles.left },
      label({ style: styles.label }, 'Channels',
        tagsinput({
          value: campaign.get('channels') || [],
          onChange: (channels) => onChangeChannels(campaign, channels),
          placeholder: 'Fashion or politics'
        })),
      label({ style: styles.label }, 'Location',
        input({
          style: styles.input,
          placeholder: (
            'Enter target state(s) or region(s) like ' +
            '“West coast” or “California”'
          )
        }))))
))
