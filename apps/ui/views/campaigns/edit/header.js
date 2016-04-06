import {
  editCampaignNext, editCampaignPrev
} from '../../../controllers/campaigns'
import { view, dom } from 'view'
import { lightGray, headerHeight, flatButton } from 'style'

const { h1, nav, div, button, a, header } = dom

const styles = {
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
  return header({ style: styles.header },
    h1({ style: styles.h1 }, 'Building an ad campaign'),
    nav({ style: styles.nav },
      ['Details', 'Assets', 'Targeting', 'Review'].map((label, i) =>
        a({ style: styles.navA, key: label }, `${i + 1} ${label}`)
      )),
    div({ style: styles.buttons },
      button({
        style: styles.prev,
        onClick: () => editCampaignNext(editCampaignStep)
      }, 'Previous'),
      button({
        style: styles.next,
        onClick: () => editCampaignPrev(editCampaignStep)
      }, 'Next')))
})
