import {
  headerHeight, flatButton, type, smallMargin, deepOcean, darkSlate, softGray
} from 'style'
import { view, dom } from 'view'
import logo from 'components/layout/logo'
import arrow from './arrow'

const { h1, nav, div, a, header } = dom
const navPadding = 18

const styles = {
  header: {
    width: '100%',
    height: `${headerHeight}px`,
    backgroundColor: 'white',
    borderBottom: `1px solid ${softGray}`,
    color: deepOcean,
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
      color: highlighted ? darkSlate : softGray,
      transition: 'color 0.2s ease-in-out'
    }
  ],
  buttons: {
    position: 'absolute',
    right: '15px',
    top: '9px'
  },
  prev: flatButton('light', {
    borderColor: 'transparent',
    color: softGray
  }),
  next: (enabled) => flatButton(enabled ? 'hot' : 'darkDisabled'),
  h1: [
    type('label'),
    {
      position: 'absolute',
      left: '150px',
      top: `${navPadding}px`,
      borderLeft: `1px solid ${darkSlate}`,
      paddingLeft: '15px',
      color: darkSlate
    }
  ]
}

export default view((_, { state }) => {
  return header({ style: styles.header },
    logo(),
    h1({ style: styles.h1 }, 'Building an ad campaign'),
    nav({ style: styles.nav },
      ['Details', 'AdBuilder', 'Targeting', 'Review'].map((label, i) => (
        a({
          style: styles.navA(state.get('step') === label.toLowerCase()),
          key: i
        }, `${i + 1}. ${label}`)
      ))),
    div({ style: styles.buttons },
      state.get('prevHref') && a({
        href: state.get('prevHref'),
        style: styles.prev,
        key: 'prev'
      }, arrow({ dir: 'left' }), 'Previous'),
      state.get('nextHref') && a({
        href: state.get('nextHref'),
        style: styles.next(state.get('enableNextStep')),
        key: 'next'
      }, 'Next', arrow({ fill: state.get('enableNextStep') ? 'white' : '' }))))
})
