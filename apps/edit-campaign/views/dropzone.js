import { view } from 'view'
import { type, centerOfParent, softGray } from 'style'
import Dropzone from 'react-dropzone'
import React from 'react'

const dropzone = (props) => React.createElement(Dropzone, props)
const style = {
  cta: [type('mediumHeader'), centerOfParent(), {
    width: '100%',
    height: '400px',
    textAlign: 'center',
    lineHeight: '400px',
    border: `3px dashed ${softGray}`,
    color: softGray
  }]
}

export default view((props) => (
  dropzone({ style: style.cta },
    'Drag and drop an image, video or color block to begin')
  )
)
