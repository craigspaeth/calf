//
// Library of CSS variables/helpers
//
export const lightGray = '#eee'
export const sansSerif = 'Helvetica, sans-serif'
export const mediumMargin = 30
export const headerHeight = 50

export const flatButton = (mode, attrs) => {
  const [backgroundColor, color] = {
    light: () => [lightGray, 'black'],
    dark: () => ['black', 'white']
  }[mode]()
  return Object.assign({
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: color,
    backgroundColor: backgroundColor,
    border: 0,
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '8px 10px',
    textDecoration: 'none'
  }, attrs || {})
}

export const type = (mode, attrs) => {
  const [fontFamily, fontSize, lineHeight] = {
    smallSansSerif: () => [sansSerif, '12px', '1.4em'],
    mediumSansSerif: () => [sansSerif, '16px', '1.4em'],
    largeSansSerif: () => [sansSerif, '24px', '1.2em']
  }[mode]()
  return Object.assign({
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontFamily: fontFamily
  }, attrs || {})
}

export const flatInput = (attrs) => (
  Object.assign({
    border: `1px solid ${lightGray}`,
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '10px',
    paddingLeft: '10px'
  }, type('mediumSansSerif'), attrs || {})
)
