import { model, $, query } from 'model'
import { assign } from 'lodash'

const schema = {
  name: $.string()
    .description('Name of campaign'),
  startAt: $.date()
    .description('Start at date'),
  endAt: $.date()
    .description('End at date'),
  channels: $.array().items($.string())
    .description('Channels to filter campaigns to, like tags.'),
  regions: $.array().items($.string())
    .description('Regions to filter campaigns to, like tags.')
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
