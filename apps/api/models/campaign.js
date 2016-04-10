import { model, $ } from 'model'
import { assign } from 'lodash'

const schema = {
  name: $.string()
    .description('Name of campaign'),
  startAt: $.date()
    .description('Start at date'),
  endAt: $.date()
    .description('End at date'),
  channels: $.array().items($.string())
    .description('Channels to filter campaign to, like tags.')
}

const saveSchema = assign({}, schema, {
  channels: schema.channels.default([]),
  startAt: schema.startAt.default(new Date()),
  endAt: schema.endAt.default(new Date())
})

model('Campaign', { schema, saveSchema })
