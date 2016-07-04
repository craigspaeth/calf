import { model, $, query } from 'model'

const colorBlock = $.object().meta({ name: 'ColorBlock' }).keys({
  type: $.string().valid('color')
    .description('Color block type'),

  color: $.string().hex()
    .description('Hex color value of background')
})

const textBlock = $.object().meta({ name: 'TextBlock' }).keys({
  type: $.string().valid('text')
    .description('Text block type'),

  text: $.string()
    .description('Text content'),

  fontFamilyId: $.string()
    .description('References font family document'),

  fontSize: $.number().integer()
    .description('Font size responsive unit')
})

const imageBlock = $.object().meta({ name: 'ImageBlock' }).keys({
  type: $.string().valid('image')
    .description('Image block type'),

  src: $.string().uri()
    .description('Image source url'),

  size: $.number().integer()
    .description('Percentage resize of image'),

  fontSize: $.number().integer()
    .description('Font size responsive unit')
})

const buttonBlock = $.object().meta({ name: 'ButtonBlock' }).keys({
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
})

const section = () =>
  $.object().meta({ name: 'Section' }).keys({
    horizontalAlign: $.string().valid('left', 'middle', 'right')
      .description('Align inner content horizontally'),

    verticalAlign: $.string().valid('top', 'middle', 'right')
      .description('Align inner content vertically'),

    blocks: $.array().items([textBlock, imageBlock, buttonBlock, colorBlock])
      .description('Content blocks for the frame')
  })

const background = $.object().meta({ name: 'Background' }).keys({
  type: $.string().valid('image', 'video', 'color')
    .description('Type of background block'),
  color: $.string().hex()
    .description('Hex color value of background'),
  src: $.string().uri()
    .description('Image or video source url')
})

const frame = $.object().meta({ name: 'Frame' }).keys({
  background: background
    .description('Background image, video, or color block to the frame'),

  transition: $.string().valid('cut', 'disolve', 'fade', 'swipe')
    .description('Animation transition for next frame'),

  toNextFrame: $.string().valid(
    'onAction', 'after1Sec', 'after2Sec', 'after3Sec', 'after5Sec'
  )
    .description('Begin the next frame after a given action'),

  firstSection: section()
    .description('First section of ad unit’s frame content'),

  middleSection: section()
    .description('Middle section of ad unit’s frame content'),

  lastSection: section()
    .description('Last section of ad unit’s frame content')
})

const campaign = {
  name: $.string()
    .description('Name of campaign'),

  startAt: $.date()
    .description('Start date of campaign'),

  endAt: $.date()
    .description('End date of campaign'),

  channels: $.array().items($.string()).default([])
    .description('Channels to target campaign to, like tags'),

  regions: $.array().items($.string()).default([])
    .description('Regions to target campaign to, like tags'),

  frames: $.array().items(frame)
    .description('Frames of content that make up the ad unit')
}

query('regions', [
  $.array().items($.string())
    .description('Returns all regions of all campaigns.'),
  (db) => db.campaigns.distinct('regions')
])

query('channels', [
  $.array().items($.string())
    .description('Returns all channels of all campaigns.'),
  (db) => db.campaigns.distinct('channels')
])

model('Campaign', { schema: campaign })
