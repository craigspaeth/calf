import { view, dom, svgfile } from 'view'
import { deepOcean } from 'style'
const fs = require('fs')

const { a } = dom

const styles = {
  logo: {
    position: 'absolute',
    height: '17px',
    left: '17px',
    top: '17px',
    zIndex: 1
  },
  svgfile: {
    svg: { height: '100%' },
    'svg *': { fill: deepOcean }
  }
}

export default view((props) => (
  a({ href: '/', style: styles.logo },
    svgfile({
      src: fs.readFileSync(__dirname + '/logo.svg'),
      style: styles.svgfile
    }))
))
