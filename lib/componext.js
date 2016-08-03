import React from 'react'
import { mapValues, assign, isObject, isString } from 'lodash'

const elAPI = (...args) => {
  let props = null
  let styleProp = {}
  let els = []
  if (React.isValidElement(args[0])) {
    els = args
  } else if (isObject(args[0])) {
    props = args[0]
    els = args.slice(1)
  } else if (isString(args[0]) && args[0].match(/^\./)) {
    styleProp = args[0]
    const others = elAPI(args.slice(1))
    props = others.props
    els = others.props
  } else if (isString(args[0])) {
    els = args
  }
  return { props, styleProp, els }
}

const els = (klasses = {}) => {
  const dom = mapValues(React.DOM, (el) => (...args) => {
    const { props, styleProp, els } = elAPI(...args)
    console.log(styleProp)
    return el(props, els)
  })
  return assign(dom, mapValues(klasses, (k) =>
    (props = {}, ctx) => React.createElement(k, props))
  )
}

export default { els }
