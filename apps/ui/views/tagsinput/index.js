import React from 'react'
import { view, dom } from 'view'
import ReactTags from 'react-tag-input'
import { Style } from 'radium'
import { flatButton, flatInput, softGray, type } from 'style'
import { uniqueId } from 'lodash'

const { div } = dom
const tagsinput = (props) => React.createElement(ReactTags.WithContext, props)
const style = (props) => React.createElement(Style, props)
const rules = (placeholder, className) => ({
  [`.${className} input`]: {
    width: `${placeholder.length * 7}px`
  },
  '.ReactTags__tags': flatInput({
    position: 'relative',
    marginTop: '5px'
  }),
  '.ReactTags__tagInput': {
    display: 'inline-block',
    marginRight: '10px'
  },
  '.ReactTags__tagInput input': flatInput({
    border: 0,
    padding: 0
  }),
  '.ReactTags__tag': flatButton('light', {
    marginRight: '10px'
  }),
  '.ReactTags__remove': {
    marginLeft: '10px',
    display: 'inline-block'
  },
  '.ReactTags__suggestions ul': type('smallCaps', {
    position: 'absolute',
    left: '-1px',
    width: 'calc(100% + 2px)',
    background: 'white',
    border: `1px solid ${softGray}`,
    top: '50px'
  }),
  '.ReactTags__suggestions li': {
    width: '100%',
    padding: '10px'
  },
  '.ReactTags__suggestions li.active': {
    background: softGray
  }
})

export default view(({ tags, placeholder, suggestions }) => {
  const className = `tags-input-${uniqueId()}`
  return div({ className },
    style({ rules: rules(placeholder, className) }),
    tagsinput({
      tags: tags.map((t) => ({ id: t.get(), text: t.get() })),
      placeholder,
      suggestions,
      handleDelete: (i) => tags.unset(i),
      handleAddition: (tag) => tags.push(tag)
    }))
})
