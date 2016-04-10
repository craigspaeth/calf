import React from 'react'
import { view, dom, style } from 'view'
import TagsInput from 'react-tagsinput'
import { flatInput, type, flatButton } from 'style'

const { div } = dom
const tagsinput = (props) => React.createElement(TagsInput, props)
const rules = {
  '.react-tagsinput': flatInput(),
  '.react-tagsinput-tag': flatButton('light', {
    marginRight: '10px',
    padding: '3px 7px'
  }),
  '.react-tagsinput-remove': {
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  '.react-tagsinput-tag a::before': {
    content: '" ×"'
  },
  '.react-tagsinput-input': type('mediumSansSerif',
    {
      background: 'transparent',
      border: '0',
      outline: 'none'
    }
  )
}

export default view(({ tags, placeholder, style: styl }) => (
  div({},
    style({ rules }),
    tagsinput({
      style: styl,
      value: tags.get(),
      onChange: (val) => tags.set(val),
      placeholder: placeholder
    }))
))
