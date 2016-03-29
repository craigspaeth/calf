import { view, dom } from 'view'
import mainheader from '../layout/header'
import { lightGray, flatInput, headerHeight } from 'style'

let { h1, nav, div, button, label, input, a, header } = dom

let style = {
  header: {
    width: '100%',
    height: '50px',
    borderBottom: `1px solid ${lightGray}`,
    background: 'white',
    position: 'absolute',
    top: `${headerHeight}px`,
    textAlign: 'center'
  },
  nav: {
    fontWeight: 'bold'
  },
  navA: {
    ':before': {
      content: 'counter(a)'
    }
  }
}

export default view((props) => (
  div({},
    mainheader({}),
    header({ style: style.header },
      h1({}, 'Building an ad campaign'),
      nav({ style: style.nav },
        a({ style: style.navA }, 'Details'),
        a({ style: style.navA }, 'Assets'),
        a({ style: style.navA }, 'Targeting'),
        a({ style: style.navA }, 'Review  '),
        button({}, 'Previous'),
        button({}, 'Next'))),
    div({},
      label({}, 'Name',
        input({ style: flatInput(), placeholder: "e.g. Tiffany's Winter Sale" })),
      label({}, 'Start date',
        input({ style: flatInput(), placeholder: 'e.g. 10/14/20' })),
      label({}, 'End date',
        input({ style: flatInput(), placeholder: 'e.g. 10/14/20' }))))
))
