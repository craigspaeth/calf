import { view, dom } from 'view'

const { div, label, input } = dom

export default view((props) => (
  div({},
    div({},
      label({}, 'Channels',
        input({ placeholder: 'Fashion or politics' })),
      label({}, 'Location',
        input({ placeholder: `\
          Enter target state(s) or region(s) like “West coast” or “California”\
        ` }))))
))
