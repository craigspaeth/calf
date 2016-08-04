import veact from 'veact'
import moment from 'moment'
import {
  type, mediumMargin, smallMargin, flatButton, softGray, containerMaxWidth,
  largeMargin
} from 'style'
import { state } from '../controller'

const view = veact()
const { div, h1, h2, h3, h4, a } = view.els()

view.styles({
  container: {
    maxWidth: `${containerMaxWidth}px`,
    margin: 'auto',
    padding: `0 ${largeMargin}px`
  },
  h1: type('mediumHeader', {
    borderBottom: `1px solid ${softGray}`,
    paddingBottom: smallMargin,
    margin: `${mediumMargin}px 0`
  }),
  addButton: flatButton('dark', {
    padding: '13px 27px',
    marginTop: mediumMargin
  }),
  itemLeft: {
    width: '25%',
    paddingRight: mediumMargin
  },
  item: {
    paddingBottom: mediumMargin,
    marginBottom: mediumMargin,
    borderBottom: `1px solid ${softGray}`
  },
  itemH2: type('mediumHeader', {
    marginBottom: '5px'
  }),
  itemH3: type('mediumBody', {
    marginTop: '10px'
  }),
  itemH4: type('mediumBody', {
    margin: `${smallMargin} 0`
  }),
  itemEdit: flatButton('light', {
    marginRight: '10px'
  }),
  itemPreview: flatButton('dark')
})

view.render(() =>
  div('.container',
    a('.addButton', { href: '/campaigns/new' }, 'Create new ad campaign'),
    h1('.h1', 'Upcomming ad campaigns'),
    state.get('campaigns').map((campaign, i) => (
      div('.item', { key: campaign._id },
        div('.itemLeft',
          h2('.itemH2', campaign.name),
          h3('.itemH3',
            moment(campaign.startAt).format('MMM. Do') + ' - ' +
            moment(campaign.endAt).format('MMM. Do')),
          h4('.itemH4',
            `Channels: ${campaign.channels.join(', ')}`),
          a('.itemEdit', {
            href: `/campaigns/${campaign._id}/edit`,
            key: 'edit' + i
          }, 'Edit'),
          a('.itemPreview', {
            href: `/campaigns/${campaign._id}/preview`,
            key: 'preview' + i,
            target: '_blank'
          }, 'Preview'))))))
)

export default view()
