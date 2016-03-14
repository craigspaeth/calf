//
// Library of CSS variables/helpers
//

export let lightGray = '#eee'

export let flatButton = (attrs) => (
  Object.assign({
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backgroundColor: lightGray,
    border: 0,
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '8px 10px'
  }, attrs || {})
)
