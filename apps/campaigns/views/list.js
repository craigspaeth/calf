import {
  type, mediumMargin, smallMargin, flatButton, softGray, containerMaxWidth,
  largeMargin
} from 'style'
import { view, dom } from 'view'
import moment from 'moment'

const { div, h1, h2, h3, h4, a } = dom

const styles = {
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
}

export default view((_, { state }) => (
  div({ style: styles.container },
    a({
      style: styles.addButton,
      href: '/campaigns/new'
    }, 'Create new ad campaign'),
    h1({ style: styles.h1 }, 'Upcomming ad campaigns'),
    state.get('campaigns').map((campaign, i) => (
      div({ style: styles.item, key: campaign._id },
        div({ style: styles.itemLeft },
          h2({ style: styles.itemH2 }, campaign.name),
          h3({ style: styles.itemH3 },
            moment(campaign.startAt).format('MMM. Do') + ' - ' +
            moment(campaign.endAt).format('MMM. Do')),
          h4({ style: styles.itemH4 },
            `Channels: ${campaign.channels.join(', ')}`),
          a({
            style: styles.itemEdit,
            href: `/campaigns/${campaign._id}/edit`,
            key: 'edit' + i
          }, 'Edit'),
          a({
            style: styles.itemPreview,
            href: `/campaigns/${campaign._id}/preview`,
            key: 'preview' + i,
            target: '_blank'
          }, 'Preview'))))))
))
