import {
  type, mediumMargin, smallMargin, flatButton, lightGray, containerMaxWidth,
  largeMargin
} from 'style'
import { view, dom } from 'view'
import moment from 'moment'

const { div, h1, h2, h3, a } = dom

const style = {
  container: {
    maxWidth: `${containerMaxWidth}px`,
    margin: 'auto',
    padding: `0 ${largeMargin}px`
  },
  h1: type('largeSansSerif', {
    borderBottom: `1px solid ${lightGray}`,
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
    borderBottom: `1px solid ${lightGray}`
  },
  itemH2: type('largeSansSerif', {
    marginBottom: '5px'
  }),
  itemH3: type('mediumSansSerif', {
    margin: `10px 0 ${mediumMargin}px 0`
  }),
  itemEdit: flatButton('light', {
    marginRight: '10px'
  }),
  itemPreview: flatButton('dark')
}

export default view(({ campaigns }) => (
  div({ style: style.container },
    a({
      style: style.addButton,
      href: '/campaigns/new'
    }, 'Create new ad campaign'),
    h1({ style: style.h1 }, 'Upcomming ad campaigns'),
    campaigns.map((campaign) => (
      div({ style: style.item, key: campaign._id },
        div({ style: style.itemLeft },
          h2({ style: style.itemH2 }, campaign.name),
          h3({ style: style.itemH3 },
            moment(campaign.startAt).format('MMM. Do') + ' - ' +
            moment(campaign.endAt).format('MMM. Do')),
          a({
            style: style.itemEdit,
            href: `/campaigns/${campaign._id}/edit`
          }, 'Edit'),
          a({
            style: style.itemPreview,
            href: `/campaigns/${campaign._id}/preview`
          }, 'Preview'))))))
))
