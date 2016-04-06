//
// Library of CSS variables/helpers
//
import { assign } from 'lodash'

export const lightGray = '#eee'
export const darkGray = '#aaa'
export const sansSerif = 'Helvetica, sans-serif'
export const smallMargin = 20
export const mediumMargin = 30
export const largeMargin = 50
export const headerHeight = 50
export const containerMaxWidth = 1024

export const flatButton = (mode, attrs) => {
  const [backgroundColor, color] = {
    light: () => [lightGray, 'black'],
    dark: () => ['black', 'white']
  }[mode]()
  return assign({
    color: color,
    backgroundColor: backgroundColor,
    border: 0,
    cursor: 'pointer',
    padding: '8px 10px',
    textDecoration: 'none',
    display: 'inline-block'
  }, type('smallCapsSansSerif'), attrs || {})
}

export const type = (mode, attrs) => {
  const [fontFamily, fontSize, lineHeight] = {
    smallCapsSansSerif: () => [sansSerif, '12px', '1.4em'],
    smallSansSerif: () => [sansSerif, '12px', '1.4em'],
    mediumSansSerif: () => [sansSerif, '16px', '1.4em'],
    largeSansSerif: () => [sansSerif, '24px', '1.2em']
  }[mode]()
  const css = assign({
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontFamily: fontFamily
  }, attrs || {})
  if (mode === 'smallCapsSansSerif') {
    assign(css, {
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 'bold'
    })
  }
  return css
}

export const flatInput = (attrs) => (
  assign({
    border: `1px solid ${lightGray}`,
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '10px',
    paddingLeft: '10px'
  }, type('mediumSansSerif'), attrs || {})
)

export const flatLabel = (attrs) => (
  assign({
    display: 'block',
    paddingBottom: '10px'
  }, type('smallCapsSansSerif'), attrs || {})
)
