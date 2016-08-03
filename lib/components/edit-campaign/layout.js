import rcomp from 'rcomp'
import { mediumMargin, flatButton, deepOcean, headerHeight } from 'style'
import Header from './header'
import { saveAndQuit, del } from './controller'

const comp = rcomp()
const { div, button, header } = comp.els({
  header: Header
})

comp.styles({
  step: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: headerHeight
  },
  bottomButtons: {
    position: 'absolute',
    bottom: mediumMargin,
    left: mediumMargin
  }
})

comp.render(({ step, campaign, enableNextStep, child }) => {
  return div({},
    header({ step, campaign, enableNextStep }),
    div('.step', child({})),
    div('.bottomButtons',
      button({
        style: flatButton('dark', { marginRight: '10px' }),
        onClick: () => saveAndQuit(campaign),
        key: 'quit'
      }, 'Save & Quit'),
      campaign.get('_id') && button({
        style: flatButton('light', {
          backgroundColor: 'transparent',
          color: deepOcean
        }),
        onClick: () => del(campaign),
        key: 'delete'
      }, 'Delete')))
})

export default comp()
