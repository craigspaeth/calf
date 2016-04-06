import { model, $ } from 'model'

model('Muggle', {
  id: $.objectid().description('Id field'),
  name: $.string().description('Campaign name'),
  birthday: $.string().isoDate().description('Start at date')
})
