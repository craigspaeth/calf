import {
  editCampaignNext, editCampaignPrev
} from '../../../controllers/campaigns'
import { view, dom } from 'view'
import { lightGray, headerHeight, flatButton } from 'style'

const { h1, nav, div, button, a, header } = dom

const style = {
  header: {
    width: '100%',
    height: `${headerHeight}px`,
    borderBottom: `1px solid ${lightGray}`,
    backgroundColor: 'white',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  nav: {
    fontWeight: 'bold',
    position: 'relative',
    padding: '17px 0'
  },
  navA: {
    paddingRight: '10px'
  },
  buttons: {
    position: 'absolute',
    right: '10px',
    top: '9px'
  },
  prev: flatButton('light', {
    backgroundColor: 'transparent'
  }),
  next: flatButton('dark'),
  h1: {
    position: 'absolute',
    left: '10px',
    top: '17px',
    fontWeight: 'bold'
  }
}

export default view(({ editCampaignStep }) => {
  return header({ style: style.header },
    h1({ style: style.h1 }, 'Building an ad campaign'),
    nav({ style: style.nav },
      ['Details', 'Assets', 'Targeting', 'Review'].map((label, i) =>
        a({ style: style.navA, key: label }, `${i + 1} ${label}`)
      )),
    div({ style: style.buttons },
      button({
        style: style.prev,
        onClick: () => editCampaignNext(editCampaignStep)
      }, 'Previous'),
      button({
        style: style.next,
        onClick: () => editCampaignPrev(editCampaignStep)
      }, 'Next')))
})
