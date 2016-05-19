import { view, dom, svgfile } from 'view'
import { softGray } from 'style'
import { join } from 'path'
import { readFileSync } from 'fs'

const { span } = dom

const styles = {
  svgfile: (fill) => ({
    'svg *': { fill },
    svg: { height: '14px' }
  }),
  span: {
    position: 'relative',
    top: '2px',
    marginLeft: '5px',
    display: 'inline-block'
  }
}

export default view(({ dir, fill }) => (
  span({
    style: [
      styles.span,
      {
        transform: `rotate(${dir === 'left' ? '180' : '0'}deg)`,
        left: dir === 'left' ? '-10px' : '3px'
      }
    ]
  },
    svgfile({
      src: readFileSync(join(__dirname, 'arrow.svg'), 'utf8'),
      style: styles.svgfile(fill || softGray)
    }))
))
