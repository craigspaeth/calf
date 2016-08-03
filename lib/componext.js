import React from 'react'
import {
  mapValues,
  assign,
  isObject,
  isString,
  get,
  merge,
  isEmpty,
  flow
} from 'lodash'
import Radium from 'radium'

//
// Convert arguments to React.DOM for a more flexible API
//
const elAPI = (...args) => {
  let props = {}
  let styleProp = {}
  let els = []
  // tag(els...)
  if (React.isValidElement(args[0]) ||
      isString(args[0]) && !args[0].match(/^\./)) {
    els = args
  // tag('.style', [props], els...)
  } else if (isString(args[0]) && !!args[0].match(/^\./)) {
    styleProp = args[0]
    const others = elAPI(...args.slice(1))
    props = others.props || {}
    els = others.els
  // tag(props, els...)
  } else if (isObject(args[0])) {
    props = args[0]
    els = args.slice(1)
  }
  return { props, styleProp, els }
}

//
// Main factory function that provides the comp.foo API to build up a React
// component and returns a function finally creates the React component
// function or class.
//
export default () => {
  let render = () => {}
  let styles = {}
  let decorators = []

  const api = () => {
    // Stateless functional component
    return flow(decorators)((...args) => render(...args))
  }

  // Hoist the component render method/function
  api.render = (fn) => { render = fn }

  // Hoist decorators
  api.decorators = (...decs) => { decorators = decs }

  // API to declare styles for convenient dot notation access in render,
  // e.g. comp.styles({ mainHeader: }); ... header('.mainHeader')
  api.styles = (s) => { styles = s }

  // Wrap React.DOM and allow the user to wrap other React components in our
  // more flexible API.
  api.els = (klasses = {}) => {
    const dom = mapValues(React.DOM, (el) => (...args) => {
      const { props: _props, els, styleProp } = elAPI(...args)
      const style = merge(get(styles, styleProp) || {}, _props.style || {})
      const props = assign(_props, { style: isEmpty(style) ? null : style })
      return el(props, els)
    })
    return assign(dom, mapValues(klasses, (k) =>
      (props = {}, ctx) => React.createElement(k, props))
    )
  }

  return api
}
