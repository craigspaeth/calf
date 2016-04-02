import { newCampaignNext } from '../../../controllers/campaigns'
import { view, dom } from 'view'
import { lightGray, headerHeight, flatButton } from 'style'

let { h1, nav, div, button, a, header } = dom

let style = {
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
  prev: flatButton({
    backgroundColor: 'transparent'
  }),
  next: flatButton({
    backgroundColor: 'black',
    color: 'white'
  }),
  h1: {
    position: 'absolute',
    left: '10px',
    top: '17px',
    fontWeight: 'bold'
  }
}

export default view((props) => {
  return header({ style: style.header },
    h1({ style: style.h1 }, 'Building an ad campaign'),
    nav({ style: style.nav },
      ['Details', 'Assets', 'Targeting', 'Review'].map((label, i) =>
        a({ style: style.navA, key: label }, `${i + 1} ${label}`)
      )),
    div({ style: style.buttons },
      button({
        style: style.prev,
        onClick: () => {
          props.newCampaignStep.set((props.newCampaignStep.get() || 0) - 1)
        }
      }, 'Previous'),
      button({
        style: style.next,
        onClick: () => {
          props.newCampaignStep.set((props.newCampaignStep.get() || 0) + 1)
        }
      }, 'Next')))
})
