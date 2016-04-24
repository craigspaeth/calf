import { view, dom, svgfile } from 'view'
const fs = require('fs')

const { span } = dom

const styles = {
  svgfile: {
    'svg *': { fill: 'white' },
    svg: { height: '14px' }
  },
  span: {
    position: 'relative',
    top: '2px',
    marginLeft: '5px'
  }
}

export default view(() =>
  span({ style: styles.span },
    svgfile({
      src: fs.readFileSync(__dirname + '/arrow.svg'),
      style: styles.svgfile
    }))
)
