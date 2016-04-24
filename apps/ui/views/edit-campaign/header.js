import {
  editCampaignNext, editCampaignPrev
} from '../../controllers/campaigns'
import {
  softGray, headerHeight, flatButton, type, smallMargin, deepOcean
} from 'style'
import { view, dom } from 'view'
import logo from '../layout/logo'
import arrow from './arrow'

const { h1, nav, div, button, a, header } = dom
const navPadding = 18

const styles = {
  header: {
    width: '100%',
    height: `${headerHeight}px`,
    borderBottom: `1px solid ${softGray}`,
    backgroundColor: 'white',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  nav: {
    fontWeight: 'bold',
    position: 'relative',
    padding: `${navPadding} 0`
  },
  navA: (highlighted) => [
    type('label'),
    {
      paddingRight: smallMargin,
      color: highlighted ? deepOcean : softGray,
      transition: 'color 0.2s ease-in-out'
    }
  ],
  buttons: {
    position: 'absolute',
    right: '15px',
    top: '9px'
  },
  prev: flatButton('light', {
    borderColor: 'transparent'
  }),
  next: flatButton('dark'),
  h1: [type('label'), {
    position: 'absolute',
    left: '150px',
    top: `${navPadding}px`,
    borderLeft: `1px solid ${softGray}`,
    paddingLeft: '15px'
  }]
}

export default view(({ editCampaignStep }) => {
  return header({ style: styles.header },
    logo(),
    h1({ style: styles.h1 }, 'Building an ad campaign'),
    nav({ style: styles.nav },
      ['Details', 'Assets', 'Targeting', 'Review'].map((label, i) => (
        a({
          style: styles.navA(editCampaignStep.get() === i),
          key: i
        }, `${i + 1}. ${label}`)
      ))),
    div({ style: styles.buttons },
      button({
        style: styles.prev,
        onClick: () => editCampaignNext(editCampaignStep)
      }, 'Previous'),
      button({
        style: styles.next,
        onClick: () => editCampaignPrev(editCampaignStep)
      }, 'Next', arrow())))
})
