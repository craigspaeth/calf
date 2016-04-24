//
// Library of CSS variables/helpers
//
import { assign, includes } from 'lodash'

// Colors
export const softGray = '#b6bec0'
export const deepOcean = '#2d3741'
export const orange = '#f46d22'

// Typography
export const lato = 'Lato, sans-serif'
export const monteserrat = 'Montserrat, sans-serif'

// Spacing
export const smallMargin = 20
export const mediumMargin = 30
export const largeMargin = 50

// Measurements
export const headerHeight = 56
export const containerMaxWidth = 1024

export const type = (mode, attrs) => {
  const [fontFamily, fontSize, lineHeight] = {
    label: () => [monteserrat, '14px', '16px'],
    smallCaps: () => [monteserrat, '12px', '18px'],
    mediumCaps: () => [monteserrat, '14px', '20px'],
    mediumBody: () => [lato, '17px', '25px'],
    largeBody: () => [lato, '21px', '29px'],
    mediumHeader: () => [monteserrat, '18px', '22px'],
    largeHeader: () => [monteserrat, '48px', '48px']
  }[mode]()
  const css = assign({
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontFamily: fontFamily,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  }, attrs || {})
  if (includes(['smallCaps', 'mediumCaps', 'mediumHeader'], mode)) {
    assign(css, {
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 'bold'
    })
  }
  if (includes(['label', 'largeHeader'], mode)) {
    assign(css, { fontWeight: 'bold' })
  }
  return css
}

export const flatButton = (mode, attrs) => {
  const [backgroundColor, color] = {
    light: () => ['transparent', deepOcean],
    dark: () => [deepOcean, 'white'],
    hot: () => [orange, 'white']
  }[mode || 'light']()
  const css = {
    color: color,
    backgroundColor: backgroundColor,
    borderTop: `1px solid ${backgroundColor}`,
    borderLeft: `1px solid ${backgroundColor}`,
    borderBottom: `1px solid ${backgroundColor}`,
    borderRight: `1px solid ${backgroundColor}`,
    cursor: 'pointer',
    padding: '8px 14px',
    textDecoration: 'none',
    display: 'inline-block',
    outline: 'none'
  }
  if (mode === 'light') assign(css, { borderColor: softGray })
  return assign(css, type('smallCaps'), attrs || {})
}

export const flatInput = (attrs) => (
  assign({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: softGray,
    paddingTop: '5px',
    paddingBottom: '6px',
    paddingRight: '10px',
    paddingLeft: '10px',
    outline: 'none',
    ':focus': { borderColor: orange }
  }, type('mediumBody'), attrs || {})
)

export const flatLabel = (attrs) => (
  assign({
    display: 'block',
    paddingBottom: '10px'
  }, type('label'), attrs || {})
)

export const centerOfParent = () => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})
