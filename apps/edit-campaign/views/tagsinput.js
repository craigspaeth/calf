import ReactTags from 'react-tag-input'
import rcomp from 'rcomp'
import { Style } from 'radium'
import { flatButton, flatInput, softGray, type, coolBlue, orange } from 'style'
import { uniqueId } from 'lodash'

const comp = rcomp()
const { div, reacttags, style } = comp.els({
  reacttags: ReactTags.WithContext,
  style: Style
})

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
    marginRight: '10px',
    marginLeft: '5px'
  },
  '.ReactTags__tagInput input': flatInput({
    border: 0,
    padding: 0
  }),
  '.ReactTags__tag': flatButton('light', {
    marginRight: '5px',
    backgroundColor: coolBlue,
    borderColor: coolBlue,
    color: 'white'
  }),
  '.ReactTags__remove': {
    display: 'inline-block',
    color: 'transparent',
    position: 'relative',
    left: '14px',
    marginLeft: '8px'
  },
  '.ReactTags__remove:after': {
    content: "'×'",
    fontSize: '22px',
    position: 'absolute',
    right: '10px',
    color: 'white'
  },
  '.ReactTags__suggestions ul': type('smallCaps', {
    position: 'absolute',
    left: '-1px',
    width: 'calc(100% + 2px)',
    background: 'white',
    border: `1px solid ${softGray}`,
    top: '47px'
  }),
  '.ReactTags__suggestions li': {
    width: '100%',
    padding: '10px'
  },
  '.ReactTags__suggestions li mark': {
    background: 'transparent',
    color: orange
  },
  '.ReactTags__suggestions li.active': {
    background: orange,
    color: 'white'
  },
  '.ReactTags__suggestions li.active mark': {
    color: 'white'
  }
})

comp.render(({ tags, placeholder, suggestions }) => {
  const className = `tags-input-${uniqueId()}`
  return div({ className },
    style({ rules: rules(placeholder, className) }),
    reacttags({
      tags: tags.map((t) => ({ id: t.get(), text: t.get() })),
      placeholder,
      suggestions,
      handleDelete: (i) => tags.unset(i),
      handleAddition: (tag) => tags.push(tag)
    }))
})

export default comp()
