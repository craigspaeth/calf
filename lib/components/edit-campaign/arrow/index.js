import veact from 'veact'
import { softGray } from 'style'
import { join } from 'path'
import { readFileSync } from 'fs'
import SvgFile from 'components/svgfile'

const view = veact()
const { span, svgfile } = view.els({ svgfile: SvgFile })

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

view.render(({ dir, fill }) =>
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
)

export default view()
