//
// Library of CSS variables/helpers
//
import { assign, includes } from 'lodash'

// Colors
export const softGray = '#b6bec0'
export const grayBlue = '#7e9aa7'
export const coolBlue = '#618190'
export const darkSlate = '#475b68'
export const deepOcean = '#2d3741'
export const orange = '#f46d22'
export const lightOrange = '#ff7e3e'
export const blueGradient = 'radial-gradient(#091028, #020613)'

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
  const [backgroundColor, hoverColor, color] = {
    light: () => ['transparent', 'transparent', deepOcean],
    dark: () => [deepOcean, darkSlate, 'white'],
    darkDisabled: () => ['transparent', 'transparent', softGray],
    hot: () => [orange, lightOrange, 'white']
  }[mode || 'light']()
  const borderColor = {
    darkDisabled: softGray
  }[mode] || backgroundColor
  const cursor = {
    darkDisabled: 'not-allowed'
  }[mode] || 'pointer'
  const css = {
    color: color,
    backgroundColor: backgroundColor,
    borderColor: backgroundColor,
    borderTop: `1px solid ${borderColor}`,
    borderLeft: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    borderRight: `1px solid ${borderColor}`,
    cursor,
    padding: '8px 14px',
    textDecoration: 'none',
    display: 'inline-block',
    outline: 'none',
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: hoverColor,
      borderColor: mode === 'light' ? 'transparent' : hoverColor
    }
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
