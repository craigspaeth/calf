import { model, $ } from 'model'

model('User', {
  schema: {
    name: $.string()
      .description('Name of user'),
    email: $.string().email()
      .description('User email')
  }
})
