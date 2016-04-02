//
// Library of CSS variables/helpers
//

export let lightGray = '#eee'
export let sansSerif = 'Helvetica, sans-serif'
export let mediumMargin = 30
export let headerHeight = 50

export let flatButton = (attrs) => (
  Object.assign({
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backgroundColor: lightGray,
    border: 0,
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '8px 10px',
    textDecoration: 'none'
  }, attrs || {})
)

export let type = (style, attrs) => {
  let [fontFamily, fontSize, lineHeight] = {
    smallSansSerif: () => [sansSerif, '12px', '1.4em'],
    mediumSansSerif: () => [sansSerif, '16px', '1.4em'],
    largeSansSerif: () => [sansSerif, '24px', '1.2em']
  }[style]()
  return Object.assign({
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontFamily: fontFamily
  }, attrs || {})
}

export let flatInput = (attrs) => (
  Object.assign({
    border: `1px solid ${lightGray}`,
    padding: `7px 10px`
  }, type('mediumSansSerif'), attrs || {})
)
