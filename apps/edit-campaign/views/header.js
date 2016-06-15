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
      transition: 'color 0.2s ease-in-out',
      textDecoration: 'none'
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

export default view((_, { tree }) => {
  return header({ style: styles.header },
    logo(),
    h1({ style: styles.h1 }, 'Building an ad campaign'),
    nav({ style: styles.nav },
      ['Details', 'AdBuilder', 'Targeting', 'Review'].map((label, i) => (
        a({
          style: styles.navA(tree.get('step') === label.toLowerCase()),
          key: i,
          href: `/campaigns/${tree.get('campaign')._id}/edit/${label.toLowerCase()}`
        }, `${i + 1}. ${label}`)
      ))),
    div({ style: styles.buttons },
      tree.get('prevHref') && a({
        href: tree.get('prevHref'),
        style: styles.prev,
        key: 'prev'
      }, arrow({ dir: 'left' }), 'Previous'),
      tree.get('nextHref') && a({
        href: tree.get('nextHref'),
        style: styles.next(tree.get('enableNextStep')),
        key: 'next'
      }, 'Next', arrow({ fill: tree.get('enableNextStep') ? 'white' : '' }))))
})
