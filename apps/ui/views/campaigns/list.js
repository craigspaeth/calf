import { type, mediumMargin, flatButton } from 'style'
import { view, dom } from 'view'
import moment from 'moment'

const { div, h1, h2, h3, button, a } = dom

const style = {
  container: {
    maxWidth: '1024px',
    margin: 'auto'
  },
  h1: type('largeSansSerif', {
    textAlign: 'center',
    margin: `${mediumMargin}px 0`
  }),
  button: flatButton('light', {
    display: 'inline-block',
    padding: '13px 27px'
  })
}

export default view(({ campaigns }) => (
  div({ style: style.container },
    a({
      style: style.button,
      href: '/campaigns/new'
    }, 'Create new ad campaign'),
    h1({ style: style.h1 }, 'Upcomming ad campaigns'),
    campaigns.map((campaign) => (
      div({ key: campaign._id },
        h2({}, campaign.name),
        h3({},
          moment(campaign.startAt).format('MM DD') + ' - ' +
          moment(campaign.endAt).format('MM DD')),
        a({ href: `/campaigns/${campaign._id}/edit` }, 'Edit'),
        button({}, 'Preview')))))
))
