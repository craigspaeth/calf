import { model, $, query } from 'model'
import { assign } from 'lodash'

const textBlockSchema = {
  type: $.string().valid('text')
    .description('Text block type'),

  text: $.string()
    .description('Text content'),

  fontFamilyId: $.string()
    .description('References font family document'),

  fontSize: $.number().integer()
    .description('Font size responsive unit')
}

const imageBlockSchema = {
  type: $.string().valid('image')
    .description('Image block type'),

  src: $.string().uri()
    .description('Image source url'),

  size: $.number().integer()
    .description('Percentage resize of image'),

  fontSize: $.number().integer()
    .description('Font size responsive unit')
}

const buttonBlockSchema = {
  type: $.string().valid('buton')
    .description('Button block type'),

  text: $.string()
    .description('Text content'),

  fontFamilyId: $.string()
    .description('References font family document'),

  fontSize: $.number().integer()
    .description('Font size responsive unit'),

  size: $.number().integer()
    .description('Percentage resize of image'),

  backgroundColor: $.string().hex()
    .description('Hex color value of background'),

  link: $.string()
    .description('Url button links to, or special string such as `frame2`')
}

const sectionSchema = {
  horizontalAlign: $.string().valid('left', 'middle', 'right')
    .description('Align inner content horizontally'),

  verticalAlign: $.string().valid('top', 'middle', 'right')
    .description('Align inner content vertically'),

  blocks: $.array().items([
    $.object().keys(textBlockSchema),
    $.object().keys(imageBlockSchema),
    $.object().keys(buttonBlockSchema)
  ])
    .description('Content blocks for the frame')
}

const frameSchema = {
  background: $.object().keys({
    type: $.string().valid('image', 'video', 'color'),
    src: $.string().uri()
  })
    .description('Background image, video, or color block to the frame'),

  transition: $.string().valid('cut', 'disolve', 'fade', 'swipe')
    .description('Animation transition for next frame'),

  toNextFrame: $.string().valid(
    'onAction', 'after1Sec', 'after2Sec', 'after3Sec', 'after5Sec'
  )
    .description('Begin the next frame after a given action'),

  firstSection: $.object().keys(sectionSchema)
    .description('First section of ad unit’s frame content'),

  middleSection: $.object().keys(sectionSchema)
    .description('Middle section of ad unit’s frame content'),

  lastSection: $.object().keys(sectionSchema)
    .description('Last section of ad unit’s frame content')
}

const schema = {
  name: $.string()
    .description('Name of campaign'),

  startAt: $.date()
    .description('Start date of campaign'),

  endAt: $.date()
    .description('End date of campaign'),

  channels: $.array().items($.string())
    .description('Channels to target campaign to, like tags'),

  regions: $.array().items($.string())
    .description('Regions to target campaign to, like tags'),

  frames: $.array().items($.object().keys(frameSchema))
    .description('Frames of content that make up the ad unit')
}

const saveSchema = assign({}, schema, {
  regions: schema.channels.default([]),
  channels: schema.channels.default([]),
  startAt: schema.startAt,
  endAt: schema.endAt
})

query('regions', [
  $.array().items($.string())
    .description('Returns all regions of all campaigns.'),
  (db) => db.collection('campaigns').distinct('regions')
])

query('channels', [
  $.array().items($.string())
    .description('Returns all channels of all campaigns.'),
  (db) => db.collection('campaigns').distinct('channels')
])

model('Campaign', { schema, saveSchema })
