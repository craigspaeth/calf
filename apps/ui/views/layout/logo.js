import { view, dom, svgfile } from 'view'
import { darkSlate } from 'style'
import { join } from 'path'
import { readFileSync } from 'fs'

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
    'svg *': { fill: darkSlate }
  }
}

export default view((props) => (
  a({ href: '/', style: styles.logo },
    svgfile({
      src: readFileSync(join(__dirname, 'logo.svg'), 'utf8'),
      style: styles.svgfile
    }))
))
